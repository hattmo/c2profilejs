import * as React from 'react'
import { Component } from 'react'
import { Row, Col, Container, Button, FormControl } from 'react-bootstrap';
import TextInput from './textInput';
import SignKeystoreInput from './signKeystoreInput';
import Keystore from './keystore';




interface Props {

}
interface State {
    keystores: Keystore[]
    waitingForPost: boolean
}
interface TextInputDef {
    text: string
    ref: string
}

const inputs: TextInputDef[] = [
    {
        text: 'Keystore',
        ref: 'id'
    },
    {
        text: 'Password',
        ref: 'password'
    },
    {
        text: 'CN',
        ref: 'CN'
    },
    {
        text: 'OU',
        ref: 'OU'
    },
    {
        text: 'O',
        ref: 'O'
    }
]
export default class KeystoreForm extends Component<Props, State> {
    currentKeyStore: Keystore = new Keystore();
    currentDNameVals: Object = {}
    constructor(props: Props) {
        super(props)
        this.handleBuild = this.handleBuild.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.state = {
            keystores: [],
            waitingForPost: false,
        }
    }

    async handleBuild() {
        this.setState({
            waitingForPost: true
        })
        console.log(this.currentKeyStore)
        try {
            await fetch('/keystores', {
                method: 'POST',
                body: JSON.stringify(this.currentKeyStore),
                headers: new Headers({ 'content-type': 'application/json' })
            })
        } catch (e) {
            console.error('invalid keystore')
        }
        this.setState({
            waitingForPost: false
        })
    }

    handleInput(e: React.FormEvent<HTMLInputElement>, id: string) {
        const value = e.currentTarget.value
        switch (id) {
            case 'id':
                this.currentKeyStore.keystore.id = value;
                break;
            case 'password':
                this.currentKeyStore.keystore.password = value;
                break;
            default:
                this.currentDNameVals[id] = value.trim();
                let dnamestring = ""
                Object.keys(this.currentDNameVals).forEach((key) => {
                    if (this.currentDNameVals[key]) dnamestring += `${key}=${this.currentDNameVals[key]}, `
                })
                dnamestring = dnamestring.slice(0, dnamestring.length - 2);
                this.currentKeyStore.opt.dname = dnamestring;
        }
    }

    buildTextInput() {
        return (
            inputs.map((val) => {
                return (
                    <TextInput onInput={this.handleInput} id={val.ref} key={val.ref} text={val.text} />
                )
            })
        )
    }
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col sm='12'>
                        <h4 className='text-center'>Keystore Options</h4>
                    </Col>
                </Row>
                <Row>
                    <Col sm='12'>
                        {this.buildTextInput()}
                        <SignKeystoreInput keystores={this.state.keystores.map((val => val.keystore.id))} />
                    </Col>
                </Row>
                <Row>
                    <Button disabled={this.state.waitingForPost} onClick={this.handleBuild} className='mx-3' variant='primary' block>Generate</Button>
                </Row>
            </Container>
        )
    }
}
