import * as React from 'react'
import { Component } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';
import CollapsablePanel from '../utility/collapsablePanel';
import FormInf, { InputTypes, Section, FieldText, FieldSelectText, FieldPairText, FieldMutation } from '../../interfaces/formInterfaces';
import InputSelectText from '../utility/inputSelectText';
import InputText from '../utility/inputText';
import InputPairText from '../utility/inputPairText';
import InputMutation from '../utility/inputMutation';



interface Props {
    formDef: FormInf
    onProfileChange: () => Promise<void>
}
interface State {
    [x: string]: any
    waitingForPost: boolean
}

export default class ProfileForm extends Component<Props, State> {

    constructor(props) {
        super(props)
        this.state = {
            waitingForPost: false
        }
        this.handleData = this.handleData.bind(this)
        this.buildFieldsInSection = this.buildFieldsInSection.bind(this)
        this.buildSection = this.buildSection.bind(this)
        this.buildSelectTextField = this.buildSelectTextField.bind(this)
        this.buildTextField = this.buildTextField.bind(this)
        this.buildPairTextField = this.buildPairTextField.bind(this)
        this.handleBuild = this.handleBuild.bind(this)
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
    buildPairTextField(field: FieldPairText) {
        return (
            <InputPairText key={field.path} onChanged={this.handleData} path={field.path} label={field.label} formatKey={field.formatKey} formatValue={field.formatValue} selectedOptions={this.state[field.path]} />
        )
    }
    buildMutationField(field: FieldMutation) {
        return (
            <InputMutation key={field.path} onChanged={this.handleData} path={field.path} transformOptions={field.transformOptions} terminationOptions={field.terminationOptions} currentMutation={this.state[field.path]} />
        )
    }

    buildFieldsInSection(section: Section): JSX.Element[] {
        return (
            section.fields ? section.fields.map(field => {
                switch (field.type) {
                    case InputTypes.FieldText:
                        return this.buildTextField(field as FieldText)
                    case InputTypes.FieldSelectText:
                        return this.buildSelectTextField(field as FieldSelectText)
                    case InputTypes.FieldPairText:
                        return this.buildPairTextField(field as FieldPairText)
                    case InputTypes.FieldMutation:
                        return this.buildMutationField(field as FieldMutation)
                }
            }) : null
        )
    }

    buildSection(section: Section): JSX.Element {
        return (
            <Row key={section.title}>
                <Col md='12'>
                    <CollapsablePanel title={section.title}>
                        {this.buildFieldsInSection(section)}
                        {section.sections && section.sections.map(this.buildSection)}
                    </CollapsablePanel>
                </Col>
            </Row>
        )
    }

    render(): JSX.Element {
        return (
            <Container fluid>
                {this.props.formDef.sections.map(this.buildSection)}
                <Row>
                    <Button disabled={this.state.waitingForPost} onClick={this.handleBuild} className='mx-3' variant='primary' block>Generate</Button>
                </Row>
            </Container>
        )
    }
    async handleBuild(): Promise<void> {
        this.setState({
            waitingForPost: true
        })
        let outObj = {};
        Object.keys(this.state).forEach(key => {
            if (key === 'waitingForPost') return
            let pointer = outObj;
            key.split('.').forEach((item, i, arr) => {
                if (i !== (arr.length - 1)) {
                    if (pointer[item] === undefined) {
                        pointer[item] = {}
                    }
                    pointer = pointer[item]
                } else {
                    pointer[item] = this.state[key]
                }
            })
        })
        try {
            const res = await fetch('/profiles', {
                method: 'POST',
                body: JSON.stringify(outObj),
                headers: new Headers({ 'content-type': 'application/json' })
            })
            if (res.status !== 200) {

            }
            await this.props.onProfileChange()
        } catch (e) {
            console.error('error fetching data')
        }
        this.setState({
            waitingForPost: false
        })
    }
}
