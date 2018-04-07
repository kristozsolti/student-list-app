import React, { Component } from 'react';
import { Row, Col, Panel, Form, FormControl, ControlLabel, FormGroup, Button, Checkbox } from 'react-bootstrap';
import { adminLogin } from '../api/api';

class LoginScreen extends Component {
    state = {
        id: '',
        password: '',
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let admin = {
            id: this.state.id,
            password: this.state.password
        }

        adminLogin(admin);
    }

    render() {
        return (
            <Row>
                <Col md={12}>
                    <Panel bsStyle="primary">
                        <Panel.Heading>
                            <Panel.Title componentClass="h3">Login as teacher</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            <Form horizontal onSubmit={this.handleSubmit}>
                                <FormGroup controlId="formHorizontalId">
                                    <Col componentClass={ControlLabel} sm={2}>
                                        ID:
                                    </Col>
                                    <Col sm={10}>
                                        <FormControl onChange={(e) => this.setState({ id: e.target.value })} type="text" placeholder="ID" />
                                    </Col>
                                </FormGroup>

                                <FormGroup controlId="formHorizontalPassword">
                                    <Col componentClass={ControlLabel} sm={2}>
                                        Password:
                                    </Col>
                                    <Col sm={10}>
                                        <FormControl onChange={(e) => this.setState({ password: e.target.value })} type="password" placeholder="Password" />
                                    </Col>
                                </FormGroup>

                                <FormGroup>
                                    <Col smOffset={2} sm={10}>
                                        <Checkbox>Remember me</Checkbox>
                                    </Col>
                                </FormGroup>

                                <FormGroup>
                                    <Col smOffset={2} sm={10}>
                                        <Button bsStyle="success" type="submit">Sign in</Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </Panel.Body>
                    </Panel>
                </Col>
            </Row >
        );
    }
}

export default LoginScreen;
