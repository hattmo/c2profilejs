import * as React from 'react'
import { Component } from 'react'
import { Container, Form, Row, Col } from 'react-bootstrap';
import CollapsablePanel from '../utility/collapsablePanel';
import GlobalOptionForm from './globalOptionForm';

export default class ProfileForm extends Component {
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col sm='12'>
                        <h4 className='text-center'>Profile Options</h4>
                    </Col>
                </Row>
                <CollapsablePanel title={'Global Options'}>
                    <GlobalOptionForm/>
                </CollapsablePanel>
                <CollapsablePanel title={'Http Get'}>
                </CollapsablePanel>
                <CollapsablePanel title={'Http Post'}>
                </CollapsablePanel>
                <CollapsablePanel title={'Http Stager'}>
                </CollapsablePanel>
            </Container>
        )
    }
}
