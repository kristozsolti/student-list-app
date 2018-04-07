import React, { Component } from 'react';
import StudentList from './StudentList';
import { Glyphicon, Panel } from 'react-bootstrap';

class OneHistory extends Component {
    state = {
        open: false
    };

    render() {
        const history = this.props;
        const presence = history.studentList.length * 10;
        return (
            <Panel expanded={this.state.open} onToggle={()=> this.setState({ open: !this.state.open })}>
                <Panel.Heading>
                    <Panel.Title componentClass="h3" toggle>
                        <Glyphicon glyph={this.state.open ? "chevron-up" : "chevron-down"} /> {history.date}
                        - {history.studentList.length} studnet(s) were present
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                    <Panel.Body>
                        <StudentList 
                        key={history.id} 
                        studentList={history.studentList} 
                        presence={presence}
                        date={history.date}
                        />
                    </Panel.Body>
                </Panel.Collapse>
            </Panel>
        );
    }

}

export default OneHistory;
