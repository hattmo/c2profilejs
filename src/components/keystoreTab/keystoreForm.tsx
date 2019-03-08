import * as React from 'react'
import { Component, ChangeEvent } from 'react'
import { Row, Col, Container, Button} from 'react-bootstrap';
import TextInput from './textInput';
import SignKeystoreInput from './signKeystoreInput';
import Keystore from '../../interfaces/keystore';


interface Props {
    onKeyStoreChange: () => Promise<void>
    keystores: Keystore[]
}

interface State {
    isChecked: boolean,
    waitingForPost: boolean,
    selectedVal: string
}

interface TextInputDef {
    text: string
    ref: string
}

interface DName {
    [keys: string]: string
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
    currentKeyStore: Keystore = {
        keystore: {
            alias: 'mykey',
            password: '',
            id: ''
        },
        opt: {
            dname: ''
        }
    }
    currentDNameVals: DName = {}

    constructor(props: Props) {
        super(props)
        this.handleBuild = this.handleBuild.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
        this.handleSelected = this.handleSelected.bind(this);
        this.state = {
            isChecked: false,
            waitingForPost: false,
            selectedVal: undefined
        }
    }

    async handleBuild() {
        this.setState({
            waitingForPost: true
        })
        this.currentKeyStore.ca = this.state.selectedVal
        try {
            const res = await fetch('/keystores', {
                method: 'POST',
                body: JSON.stringify(this.currentKeyStore),
                headers: new Headers({ 'content-type': 'application/json' })
            })
            if (res.status !== 200) {

            }
            await this.props.onKeyStoreChange()
        } catch (e) {
            console.error('invalid keystore')
        }
        this.setState({
            selectedVal: undefined,
            isChecked: false,
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

    handleChecked(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            isChecked: event.target.checked,
            selectedVal: undefined
        })
    }

    handleSelected(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            selectedVal: e.currentTarget.value
        })
    }

    buildTextInput(): JSX.Element[] {
        return (
            inputs.map((val) => {
                return (
                    <TextInput onInput={this.handleInput} id={val.ref} key={val.ref} text={val.text} />
                )
            })
        )
    }
    render(): JSX.Element {
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
                        <SignKeystoreInput selectedVal={this.state.selectedVal ? this.state.selectedVal : ''} onSelected={this.handleSelected} onChecked={this.handleChecked} isChecked={this.state.isChecked} keystores={this.props.keystores.map((val => val.keystore.id))} />
                    </Col>
                </Row>
                <Row>
                    <Button disabled={this.state.waitingForPost} onClick={this.handleBuild} className='mx-3' variant='primary' block>Generate</Button>
                </Row>
            </Container>
        )
    }
}
