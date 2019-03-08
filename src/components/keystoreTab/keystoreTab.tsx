import * as React from 'react'
import { Component } from 'react'
import { Row, Col, Container } from 'react-bootstrap';
import KeystoreForm from './keystoreForm';
import KeystorePanel from './keystorePanel';
import Keystore from '../../interfaces/keystore';
import KeystoreList from './keystoreList';


interface State {
    keystores: Keystore[]
}
interface Props {

}
export default class KeystoreTab extends Component<Props, State> {

    constructor(props: Readonly<Props>) {
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
        await this.checkForKeystores()
    }
    buildPanels(): JSX.Element[] {
        return this.state.keystores.map((val) => {
            return (<KeystorePanel ca={val.ca} dname={val.opt.dname} title={val.keystore.id} key={val.keystore.id} ></KeystorePanel>)
        })
    }
    render(): JSX.Element {
        return (
            <Container fluid>
                <Row>
                    <Col md='9'>
                        <KeystoreForm keystores={this.state.keystores} onKeyStoreChange={this.checkForKeystores} />
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
