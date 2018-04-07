import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import Student from './Student';
import { Button, ProgressBar, Glyphicon, Row, Col } from 'react-bootstrap';

class StudentList extends Component {

    render() {
        const progress = this.props.presence;
        const today = this.props.date;
        const title = (
            <div>
                <Row>
                    <Col md={2} xs={2}>
                        <Glyphicon glyph="calendar" />
                        <b>Date:</b>
                    </Col>
                    <Col md={10} xs={10}>
                        <b>{today}</b>
                    </Col>
                </Row>
                <Row>
                    <Col md={2} xs={2}>
                        <Glyphicon glyph="user" />
                        <b>Presence:</b>
                    </Col>
                    <Col md={10} xs={10}>
                        <ProgressBar bsStyle="info" now={progress} label={`${progress}%`} active />
                    </Col>
                </Row>
            </div>
        );

        const students = this.props.studentList.map((student, index) => {
            return <Student key={student.id} index={index + 1} isAdmin={this.props.isAdmin} removeStudentHandler={this.props.removeStudentHandler} {...student} />;
        });

        return (
            <div>
                <hr />
                {title}
                <hr />
                <Button bsStyle="success" onClick={() => this.props.saveStudentHandler()}>Save Student</Button>
                <Panel bsStyle="primary">
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">Students attended</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        {students}
                    </Panel.Body>
                </Panel>
            </div>
        );
    }

}

export default StudentList;