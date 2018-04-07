import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
//Import my components
import Home from './Home';
import AdminScreen from './AdminScreen';
import HistoryList from './HistoryList';
//Import api and other functions
import { subscribeToStudentListChange, refreshStudentListState, unsubscribeFromEvents, saveStudent, removeStudent, subscribeToAdminLogin } from '../api/api';
import toastr from 'toastr';
import * as moment from 'moment';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            studentList: [],
            isAdmin: true,
            presence: 0,
            fbLoggedIn: false,
            date: moment().format('YYYY-MM-DD'),
            studentList2: [
                {
                    id: 1235,
                    name: "John Smith",
                    email: "johnsmith@example.com",
                    pictureUrl: "https://www.shareicon.net/download/2016/09/01/822711_user_512x512.png"
                }, {
                    id: 3652,
                    name: "Json Statham",
                    email: "jsonrocks@example.com",
                    pictureUrl: "https://www.shareicon.net/download/2016/05/26/771189_man_512x512.png"
                }, {
                    id: 654682,
                    name: "Mona Lisa",
                    email: "lisam@example.com",
                    pictureUrl: "https://cdn4.iconfinder.com/data/icons/business-conceptual-part1-1/513/business-woman-512.png"
                }, {
                    id: 84522,
                    name: "Erica Mathias",
                    email: "mathiase@example.com",
                    pictureUrl: "https://www.shareicon.net/download/2016/08/18/813793_people_512x512.png"
                }, {
                    id: 776655,
                    name: "Lucas Beardman",
                    email: "bman@example.com",
                    pictureUrl: "https://www.shareicon.net/download/2016/07/26/802011_man_512x512.png"
                }
            ]
        }
    }

    componentDidMount() {
        subscribeToStudentListChange();

        refreshStudentListState((student) => {
            // console.log(student)
            if (!student.deleted) {
                this.setState(prevState => ({
                    studentList: prevState.studentList.concat([student]),
                    presence: (prevState.studentList.length + 1) * 10
                }));
            } else {
                const newState = this.state.studentList.filter(obj => obj.id !== student.id);

                this.setState({
                    studentList: newState,
                    presence: (newState.length) * 10
                });
            }
        });

        subscribeToAdminLogin((result) => {
            if (result === true) {
              this.setState({ isAdmin: result });
              toastr.success('Now you can manage the students.', 'Authentication succeeded!');
            } else {
              toastr.error('Check the username and password.', 'Authentication failed!');
            }
          });
    }

    saveStudentHandler = () => {
        if (this.state.studentList2.length) {

            const actualState = this.state.studentList2;
            const lastStudent = actualState.pop();

            this.setState({
                studentList2: actualState
            });

            saveStudent({ student: lastStudent });
        }
    }

    removeStudentHandler = (student) => {
        const actualState = this.state.studentList;
        const actualStudent = actualState.splice(student.index - 1, 1)

        this.setState({
            studentList: actualState,
            presence: (actualState.length) * 10
        });

        removeStudent(actualStudent[0]);
        toastr.success(actualStudent[0].name + ' has been successfully kicked from the class.', 'Student kicked from the class!');
    }

    fbLoginHandler = (status) => {
        this.setState({ fbLoggedIn: status })
    }

    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/'
                        render={(props) =>
                            <Home {...props}
                                saveStudentHandler={this.saveStudentHandler}
                                studentList={this.state.studentList}
                                studentList2={this.state.studentList2}
                                presence={this.state.presence}
                                isAdmin={this.state.isAdmin}
                                date={this.state.date}
                                fbLoggedIn={this.state.fbLoggedIn}
                                fbLoginHandler={this.fbLoginHandler}
                            />
                        }
                    />
                    <Route exact path='/admin'
                        render={(props) => <AdminScreen {...props}
                            saveStudentHandler={this.saveStudentHandler}
                            removeStudentHandler={this.removeStudentHandler}
                            studentList={this.state.studentList}
                            studentList2={this.state.studentList2}
                            presence={this.state.presence}
                            isAdmin={this.state.isAdmin}
                            date={this.state.date}
                        />
                        }
                    />
                    <Route exact path='/history'
                        render={(props) => <HistoryList date={this.state.date}/>}
                    />
                </Switch>
            </main>
        );
    }

    componentWillUnmount() {
        unsubscribeFromEvents();
    }
}

export default Main;