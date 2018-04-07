import React, { Component } from 'react';
import StudentList from './StudentList';
import LoginScreen from './LoginScreen';
import { saveStudentList } from '../api/api';
import { Row, Col, Panel, Button, Glyphicon } from 'react-bootstrap';

class AdminScreen extends Component {

  handleSaveStudentList = (studentList, date) => {
    saveStudentList(studentList, date);
  }

  render() {
    const saveStudentListBtn = (
      <Button bsStyle="info" onClick={() => this.handleSaveStudentList(this.props.studentList, this.props.date)}>
        <Glyphicon glyph="save" /> Save Student List
      </Button>
    );

    return (
      <Row>
        <Col md={12}>
          <Panel>
            {/* <Panel.Heading>
              <Panel.Title componentClass="h3">Admin Screen</Panel.Title>
            </Panel.Heading> */}
            <Panel.Body>
              <Col md={2}>
                {saveStudentListBtn}
              </Col>
              <Col md={8}>
                {
                  this.props.isAdmin
                    ? <StudentList
                      saveStudentList={this.handleSaveStudentList}
                      saveStudentHandler={this.props.saveStudentHandler}
                      removeStudentHandler={this.props.removeStudentHandler}
                      studentList={this.props.studentList}
                      studentList2={this.props.studentList2}
                      presence={this.props.presence}
                      isAdmin={this.props.isAdmin}
                      date={this.props.date}
                    />
                    : <LoginScreen />
                }
              </Col>
            </Panel.Body>
          </Panel>
        </Col>
      </Row>
    );
  }
}

export default AdminScreen;
