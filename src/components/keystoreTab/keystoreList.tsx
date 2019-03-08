import * as React from 'react'
import { Component } from 'react'
import { Row, Col, Container } from 'react-bootstrap';

export default class KeystoreList extends Component {
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col sm='12'>
                        <h4 className='text-center'>Keystores</h4>
                    </Col>
                </Row>
                <Row>
                    <Col sm='12'>
                        {this.props.children}
                    </Col>
                </Row>
            </Container>
        )
    }
}
