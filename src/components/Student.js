import React, { Component } from 'react';
import { Panel, Row, Col, Glyphicon, Button, Label, Image } from 'react-bootstrap';

class Student extends Component {
    render() {
        const student = this.props;
        const deleteBtn = (
            <Button bsStyle="danger" onClick={() => student.removeStudentHandler(student)}>
                <Glyphicon glyph="trash" />
            </Button>
        );

        return (
            <Row>
                <Col md={12} xs={12}>
                    <Panel>
                        <Panel.Body>
                            <Col md={1} xs={1} className="text-center">
                                <h4><Label bsStyle="info">#{student.index}.</Label></h4>
                            </Col>
                            <Col md={2} xs={2} className="text-center">
                                <Image src={student.pictureUrl} width="50" alt="" circle />
                            </Col>
                            <Col md={7} xs={7}>
                                <b>{student.name}</b>
                                <br />
                                {student.email}
                            </Col>
                            <Col md={2} xs={2} className="text-center">
                                {
                                    this.props.isAdmin ? deleteBtn : null
                                }
                            </Col>
                        </Panel.Body>
                    </Panel>
                </Col>
            </Row>
        );
    }
}

export default Student;