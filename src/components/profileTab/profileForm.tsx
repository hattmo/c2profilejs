import * as React from 'react'
import { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import CollapsablePanel from '../utility/collapsablePanel';
import FormInf, { InputTypes, Section, FieldText, FieldSelectText, FieldPairText } from '../../interfaces/formInterfaces';
import InputSelectText from '../utility/inputSelectText';
import InputText from '../utility/inputText';
import InputPairText from '../utility/inputPairText';



interface Props {
    formDef: FormInf
}
interface State {
    [x: string]: any
}

export default class ProfileForm extends Component<Props, State> {

    constructor(props) {
        super(props)
        this.state = {}
        this.handleData = this.handleData.bind(this)
        this.buildFieldsInSection = this.buildFieldsInSection.bind(this)
        this.buildSection = this.buildSection.bind(this)
        this.buildSelectTextField = this.buildSelectTextField.bind(this)
        this.buildTextField = this.buildTextField.bind(this)
        this.buildPairTextField = this.buildPairTextField.bind(this)
    }

    handleData(path: string, data: any) {
        console.log(path, data)
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
            </Container>
        )
    }
}
//<SelectText selectedOptions={this.state.selectedOptions} onChanged={this.updateData} options={cobaltStrikeProfile.sections[0].fields[0].options}></SelectText>