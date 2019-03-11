import * as React from 'react'
import { Component } from 'react'
import { Row, Col, Container, Button } from 'react-bootstrap';
import Keystore from '../../interfaces/keystore';
import FormInf, { InputTypes, Section, FieldText, FieldSelectText, FieldSignKeystore } from '../../interfaces/FormInterfaces';
import InputText from '../utility/inputText';
import InputSelectText from '../utility/inputSelectText';
import InputSignKeystore from '../utility/inputSignKeystore';


interface Props {
    formDef: FormInf
    onKeyStoreChange: () => Promise<void>
    keystores: Keystore[]
}

interface State {
    waitingForPost: boolean
    [x: string]: any
}

export default class KeystoreForm extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = {
            waitingForPost: false
        }
        this.handleData = this.handleData.bind(this)
        this.componentWillMount = this.componentWillMount.bind(this)
    }

    componentWillMount() {

        this.props.formDef.sections.forEach(val => {
            this.populateState(val)
        })
    }
    populateState(section: Section) {
        section.fields.forEach(val => {
            if ((val.type === InputTypes.FieldPairText) || (val.type === InputTypes.FieldSelectText)) {
                this.setState({
                    [val.path]: []
                })
            } else {
                this.setState({
                    [val.path]: ''
                })
            }

        })
        if (section.sections) {
            section.sections.forEach(val => {
                this.populateState(val)
            })
        }
    }


    handleData(path: string, data: any) {
        this.setState({
            [path]: data
        })
    }
    buildTextField(field: FieldText) {
        return (
            <InputText key={field.path} onChanged={this.handleData} path={field.path} label={field.label} format={field.format} text={this.state[field.path]} ></InputText>
        )
    }
    buildSelectTextField(field: FieldSelectText) {
        return (
            <InputSelectText key={field.path} onChanged={this.handleData} path={field.path} options={field.options} selectedOptions={this.state[field.path]} ></InputSelectText>
        )
    }


    buildSignKeystoreField(field: FieldSignKeystore) {
        return (
            <InputSignKeystore key={field.path} onChanged={this.handleData} path={field.path} label={field.label} keystores={this.props.keystores.map(v => v.keystore.id)} selectedVal={this.state[field.path]} ></InputSignKeystore>
        )
    }
    buildFieldsInSection(section: Section): JSX.Element[] {
        return (
            section.fields.map(field => {
                switch (field.type) {
                    case InputTypes.FieldText:
                        return this.buildTextField(field as FieldText)
                    case InputTypes.FieldSelectText:
                        return this.buildSelectTextField(field as FieldSelectText)
                    case InputTypes.FieldSignKeystore:
                        return this.buildSignKeystoreField(field as FieldSignKeystore)
                }
            })
        )
    }
    render(): JSX.Element {
        return (
            <Container fluid>
                <Row>
                    <Col sm='12'>
                        <h4 className='text-center'>{this.props.formDef.sections[0].title}</h4>
                    </Col>
                </Row>
                <Row>
                    <Col sm='12'>
                        {this.buildFieldsInSection(this.props.formDef.sections[0])}
                    </Col>
                </Row>
                <Row>
                    <Button disabled={this.state.waitingForPost} onClick={() => { }} className='mx-3' variant='primary' block>Generate</Button>
                </Row>
            </Container>
        )
    }

    // async handleBuild(): Promise<void> {
    //     this.setState({
    //         waitingForPost: true
    //     })
    //     this.currentKeyStore.ca = this.state.selectedVal
    //     try {
    //         const res = await fetch('/keystores', {
    //             method: 'POST',
    //             body: JSON.stringify(this.currentKeyStore),
    //             headers: new Headers({ 'content-type': 'application/json' })
    //         })
    //         if (res.status !== 200) {

    //         }
    //         await this.props.onKeyStoreChange()
    //     } catch (e) {
    //         console.error('invalid keystore')
    //     }
    //     this.setState({
    //         selectedVal: undefined,
    //         isChecked: false,
    //         waitingForPost: false
    //     })
    // }
}
