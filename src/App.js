import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import { Row, Col } from 'react-bootstrap';

const App = () => (
  <Row>
    <Col md={12}>
      <Header />
      <Main />
    </Col>
  </Row>
);

export default App;

