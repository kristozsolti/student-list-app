import React, { Component } from 'react';
import FacebookLoginButton from './FacebookLoginUtils';
import StudentList from './StudentList';
import { saveStudent } from '../api/api';
import { Row, Col } from 'react-bootstrap';
import toastr from 'toastr';

class Home extends Component {
  handleFacebookLogin = (res) => {
    if (res) {
      saveStudent({ student: res });
      //this.props.fbLoginHandler(true);
      toastr.success('Now you participate at the catalogue.', 'Login succeeded!');
    } else {
      toastr.error('Something went wrong. Check your network connection.', 'Login failed!');
    }
  }

  render() {
    return (
      <Row>
        <Col md={2}>
          { this.props.fbLoggedIn ? null : <FacebookLoginButton callback={this.handleFacebookLogin} fbLoginHandler={this.props.fbLoginHandler}/> }
        </Col>
        <Col md={8}>
          <StudentList
            saveStudentHandler={this.props.saveStudentHandler}
            studentList={this.props.studentList}
            studentList2={this.props.studentList2}
            presence={this.props.presence}
            date={this.props.date}
          />
        </Col>
        <Col md={2}></Col>
      </Row>
    );
  }
}

export default Home;
