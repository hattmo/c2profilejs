import * as React from 'react'
import { Component } from 'react'
import { Row, Col, Container } from 'react-bootstrap';
import KeystoreForm from './keystoreForm';
import Keystore from '../../interfaces/keystore';
import KeystoreList from './keystoreList';
import CollapsablePanel from '../utility/collapsablePanel';
import KeystoreData from './keystoreData';
import keystoreDesc from '../../formDescription/keystoreDesc'

interface State {
    keystores: Keystore[]
}
interface Props {

}
export default class KeystoreTab extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = {
            keystores: []
        }
        this.checkForKeystores = this.checkForKeystores.bind(this);
        this.buildPanels = this.buildPanels.bind(this);
    }

    async checkForKeystores(): Promise<void> {
        const keystores = await (await fetch('/keystores', {
            method: 'GET',
        })).json();
        this.setState({
            keystores
        })
    }
    async componentDidMount(): Promise<void> {
 //       await this.checkForKeystores()
    }
    buildPanels(): JSX.Element[] {
        return this.state.keystores.map((val) => {
            return (
                <CollapsablePanel title={val.keystore.id} key={val.keystore.id} >
                    <KeystoreData ca={val.ca} dname={val.opt.dname} title={val.keystore.id} />
                </CollapsablePanel>
            )
        })
    }
    render(): JSX.Element {
        return (
            <Container fluid>
                <Row>
                    <Col md='9'>
                        <KeystoreForm formDef={keystoreDesc} keystoreNames={this.state.keystores.map(val => val.keystore.id)} onKeyStoreChange={this.checkForKeystores} />
                    </Col>
                    <Col md='3'>
                        <KeystoreList>
                            {this.buildPanels()}
                        </KeystoreList>
                    </Col>
                </Row>
            </Container>
        )
    }
}
