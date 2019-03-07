import * as React from 'react'
import { Component } from 'react'
import { Row, Col } from 'react-bootstrap';
import KeystoreForm from './keystoreForm';

export default class Keystore extends Component {
    render() {
        return (
            <Row>
                <Col md='9'>
                    <KeystoreForm />
                </Col>
                <Col md='3'>
                </Col>
            </Row>
        )
    }
}
