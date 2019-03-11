import * as React from 'react'
import { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import ProfileForm from './profileForm';

export default class ProfileTab extends Component {

    render() : JSX.Element{
        return (
            <Container fluid>
                <Row>
                    <Col md='9'>
                        <ProfileForm/>
                    </Col>
                    <Col md='3'>

                    </Col>
                </Row>
            </Container>
        )
    }
}
