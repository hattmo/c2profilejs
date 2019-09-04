import * as React from "react";
import { Component } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import FormInf, { FieldMutation, FieldPairText, FieldSelectText, FieldText, InputTypes, Section } from "../../../interfaces/formInterfaces";
import CollapsablePanel from "../utility/collapsablePanel";
import InputMutation from "../utility/inputMutation";
import InputPairText from "../utility/inputPairText";
import InputSelectText from "../utility/inputSelectText";
import InputText from "../utility/InputText";

interface Props {
    formDef: FormInf;
    onProfileChange: () => Promise<void>;
}
interface State {
    [x: string]: any;
    waitingForPost: boolean;
}

export default class ProfileForm extends Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            waitingForPost: false,
        };
        this.handleData = this.handleData.bind(this);
        this.buildFieldsInSection = this.buildFieldsInSection.bind(this);
        this.buildSection = this.buildSection.bind(this);
        this.buildSelectTextField = this.buildSelectTextField.bind(this);
        this.buildTextField = this.buildTextField.bind(this);
        this.buildPairTextField = this.buildPairTextField.bind(this);
        this.handleBuild = this.handleBuild.bind(this);
    }

    public handleData(path: string, data: any) {
        this.setState({
            [path]: data,
        });
    }
    public buildTextField(field: FieldText) {
        return (
            <InputText key={field.path} onChanged={this.handleData} path={field.path} label={field.label} format={field.format} text={this.state[field.path]} ></InputText>
        );
    }
    public buildSelectTextField(field: FieldSelectText) {
        return (
            <InputSelectText key={field.path} onChanged={this.handleData} path={field.path} options={field.options} selectedOptions={this.state[field.path]} ></InputSelectText>
        );
    }
    public buildPairTextField(field: FieldPairText) {
        return (
            <InputPairText key={field.path} onChanged={this.handleData} path={field.path} label={field.label} formatKey={field.formatKey} formatValue={field.formatValue} selectedOptions={this.state[field.path]} />
        );
    }
    public buildMutationField(field: FieldMutation) {
        return (
            <InputMutation key={field.path} onChanged={this.handleData} path={field.path} transformOptions={field.transformOptions} terminationOptions={field.terminationOptions} currentMutation={this.state[field.path]} />
        );
    }

    public buildFieldsInSection(section: Section): JSX.Element[] {
        if (section.fields !== undefined) {
            return (
                section.fields.map((field) => {
                    switch (field.type) {
                        case InputTypes.FieldText:
                            return this.buildTextField(field as FieldText);
                        case InputTypes.FieldSelectText:
                            return this.buildSelectTextField(field as FieldSelectText);
                        case InputTypes.FieldPairText:
                            return this.buildPairTextField(field as FieldPairText);
                        case InputTypes.FieldMutation:
                            return this.buildMutationField(field as FieldMutation);
                        default:
                            throw new Error();
                    }
                })
            );
        } else {
            return [];
        }
    }

    public buildSection(section: Section): JSX.Element {
        return (
            <Row key={section.title}>
                <Col md="12">
                    <CollapsablePanel title={section.title}>
                        {this.buildFieldsInSection(section)}
                        {section.sections && section.sections.map(this.buildSection)}
                    </CollapsablePanel>
                </Col>
            </Row>
        );
    }

    public render(): JSX.Element {
        return (
            <Container fluid>
                {this.props.formDef.sections.map(this.buildSection)}
                <Row>
                    <Button disabled={this.state.waitingForPost} onClick={this.handleBuild} className="mx-3" variant="primary" block>Generate</Button>
                </Row>
            </Container>
        );
    }
    public async handleBuild(): Promise<void> {
        this.setState({
            waitingForPost: true,
        });
        const outObj = {};
        Object.keys(this.state).forEach((key) => {
            if (key === "waitingForPost") { return; }
            let pointer = outObj;
            key.split(".").forEach((item, i, arr) => {
                if (i !== (arr.length - 1)) {
                    if (pointer[item] === undefined) {
                        pointer[item] = {};
                    }
                    pointer = pointer[item];
                } else {
                    pointer[item] = this.state[key];
                }
            });
        });
        try {
            const res = await fetch("/profiles", {
                method: "POST",
                body: JSON.stringify(outObj),
                headers: new Headers({ "content-type": "application/json" }),
            });
            if (res.status !== 200) {

            }
            await this.props.onProfileChange();
        } catch (e) {
            console.error("error fetching data");
        }
        this.setState({
            waitingForPost: false,
        });
    }
}
