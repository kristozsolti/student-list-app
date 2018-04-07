import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Glyphicon, Button } from 'react-bootstrap';

class Header extends Component {
    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Glyphicon glyph="book" />
                        <Link to="/"> Catalogue</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Navbar.Text>
                        <Button type="button">
                            <Link to="/admin">Admin</Link>
                        </Button>
                    </Navbar.Text>
                    <Navbar.Text>
                        <Button type="button">
                            <Link to="/history">History</Link>
                        </Button>
                    </Navbar.Text>
                    <Navbar.Text pullRight>
                        Signed in as: <Navbar.Link href="#">Cserepes Virág</Navbar.Link>
                    </Navbar.Text>
                    <Navbar.Text pullRight>Have a great day!</Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;
