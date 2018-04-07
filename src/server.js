const express = require('express');
const app = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server, { wsEngine: 'ws' });
const r = require('rethinkdb');
const ioPort = 8000;

//DB connection parameters
const dbHost = 'localhost';
const dbPort = 28015;
const dbDatabase = 'studentList';

function getStudents({ client, connection }) {
    r.table('students')
        .changes({ includeInitial: true })
        .run(connection)
        .then((cursor) => {
            cursor.each((err, studentRow) => {
                client.emit('student', studentRow.new_val);
            });
        });
}

function saveStudent({ connection, student }) {
    r.table('students')
        .insert(
            {
                id: student.id,
                name: student.name,
                email: student.email,
                pictureUrl: student.pictureUrl,
                deleted: false
            }, {
                conflict: 'update'
            }
        )
        .run(connection)
        .then(() => console.log('Student saved. Name: ', student.name))
}

function removeStudent({ connection, student }) {
    r.table('students')
        .filter(
            r.row('id')
                .eq(student.id)
        )
        .update({ deleted: true })
        .run(connection)
        .then(() => console.log('Student removed. Name: ', student.name));
}

function adminLogin({ client, connection, admin }) {
    r.table('admin')
        .run(connection)
        .then((cursor) => {
            cursor.toArray((err, result) => {
                if (result[0].id === admin.id && result[0].password === admin.password) {
                    client.emit('admin');
                } else {
                    client.emit('notAdmin');
                }
            });
        });
}

function saveStudentList({ connection, studentList, date }) {
    r.table('history')
        .insert(
            {
                id: date,
                date: date,
                studentList: studentList
            }, {
                conflict: 'update'
            }
        )
        .run(connection)
        .then(() => console.log('Student List saved. Date: ', date))
}

function loadHistoryList({ client, connection }) {
    r.table('history')
        .changes({ includeInitial: true })
        .run(connection)
        .then((cursor) => {
            cursor.each((err, historyRow) => {
                client.emit('history', historyRow.new_val);
            });
        });
}

function searchHistory({ client, connection, date }) {
    r.table('history')
        .filter(
            r.row('date').match(date)
        )
        .orderBy(r.desc('date'))
        .run(connection)
        .then((cursor) => {
            cursor.toArray((err, historyRow) => {
                client.emit('historySearchResult', historyRow);
            });
        });
}

//Connect to the database, then we can handle the events
r.connect({
    host: dbHost,
    port: dbPort,
    db: dbDatabase
}).then((connection) => {
    io.on('connection', (client) => {
        //New connections send to classroom "room"
        client.join('classroom');

        //Sends the actual state of the app to a new connection (also on change)
        client.on('subscribeToStudentListChange', () => {
            getStudents({ client, connection });
        });

        //Saves the student to the database
        client.on('saveStudent', ({ student }) => {
            saveStudent({ connection, student });
        });

        //Removes student from the database
        client.on('removeStudent', (student) => {
            removeStudent({ connection, student });
        });

        //If admin tryes to log in
        client.on('adminLogin', (admin) => {
            adminLogin({ client, connection, admin });
        });

        //Save all students that admin saves
        client.on('saveStudentList', ({ studentList, date }) => {
            saveStudentList({ connection, studentList, date });
        });

        client.on('loadHistoryList', () => {
            loadHistoryList({ client, connection });
        });

        client.on('searchHistory', (date) => {
            //console.log(date);
            searchHistory({ client, connection, date });
        });
    });
});

server.listen(ioPort);
console.log('Server listening on port', ioPort, '...');