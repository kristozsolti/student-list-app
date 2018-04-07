import React, { Component } from 'react';
import { loadHistoryList, refreshHistoryListState, unsubscribeFromEvents, searchHistory, historySearchResult } from '../api/api';
import OneHistory from './History';
import { Row, Col, Glyphicon, FormGroup, InputGroup, FormControl, ControlLabel, } from 'react-bootstrap';

class HistoryList extends Component {
    state = {
        inputValue: this.props.date.slice(0, -2),//'2018-',
        historyList: []
    }

    componentDidMount() {
        loadHistoryList();

        refreshHistoryListState((history) => {
            let historyInState = this.state.historyList.filter((h) => h.id === history.id).length;
            //console.log(history)
            if (!historyInState) {
                this.setState(prevState => ({
                    historyList: prevState.historyList.concat([history])
                }));
            } else {
                const actualState = this.state.historyList.filter((h) => h.id !== history.id);
                let newState = actualState.concat([history])

                this.setState({
                    historyList: newState
                });
            }
        });

        historySearchResult((searchResult) => {
            this.setState({ historyList: searchResult })
        });

    }

    handleSearchInput = (event) => {
        event.preventDefault();
        this.setState({ inputValue: event.target.value });

        //SetTimeout otherwise the last character is not present
        setTimeout(() => {
            searchHistory(this.state.inputValue);
        }, 0);

    }

    render() {
        const histories = this.state.historyList.map((history, index) => <OneHistory key={history.id} {...history} />);
        return (
            <div>
                <Row>
                    <Col md={4} mdOffset={4} xs={6} xsOffset={3}>
                        <FormGroup>
                            <ControlLabel>Search by date: (Ex: 2018-04-06)</ControlLabel>
                            <InputGroup>
                                <InputGroup.Addon>
                                    <Glyphicon glyph="search" />
                                </InputGroup.Addon>
                                <FormControl type="text" value={this.state.inputValue} onChange={(e) => this.handleSearchInput(e)} />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={8} mdOffset={2} xs={10} xsOffset={1}>
                        { histories }
                    </Col>
                </Row>
            </div>
        );
    }

    componentWillUnmount() {
        unsubscribeFromEvents();
    }

}

export default HistoryList;
