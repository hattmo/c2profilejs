import * as React from "react";
import { Component } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import FormInf, { FieldSelectText, FieldSignKeystore, FieldText, InputTypes, Section } from "../../interfaces/formInterfaces";
import InputSelectText from "../utility/inputSelectText";
import InputSignKeystore from "../utility/inputSignKeystore";
import InputText from "../utility/inputText";

interface Prop {
    formDef: FormInf;
    onKeyStoreChange: () => Promise<void>;
    keystoreNames: string[];
}

interface State {
    waitingForPost: boolean;
    [x: string]: any;
}

export default class KeystoreForm extends Component<Prop, State> {

    constructor(props: Prop) {
        super(props);
        this.state = {
            waitingForPost: false,
        };
        this.handleData = this.handleData.bind(this);
        this.handleBuild = this.handleBuild.bind(this);
    }

    public handleData(path: string, data: any) {
        console.log(path, data);
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

    public buildSignKeystoreField(field: FieldSignKeystore) {
        return (
            <InputSignKeystore key={field.path} onChanged={this.handleData} path={field.path} label={field.label} keystoreNames={this.props.keystoreNames} selectedVal={this.state[field.path]} ></InputSignKeystore>
        );
    }
    public buildFieldsInSection(section: Section): JSX.Element[] {
        return (
            section.fields.map((field) => {
                switch (field.type) {
                    case InputTypes.FieldText:
                        return this.buildTextField(field as FieldText);
                    case InputTypes.FieldSelectText:
                        return this.buildSelectTextField(field as FieldSelectText);
                    case InputTypes.FieldSignKeystore:
                        return this.buildSignKeystoreField(field as FieldSignKeystore);
                }
            })
        );
    }
    public render(): JSX.Element {
        return (
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <h4 className="text-center">{this.props.formDef.sections[0].title}</h4>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12">
                        {this.buildFieldsInSection(this.props.formDef.sections[0])}
                    </Col>
                </Row>
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
            const res = await fetch("/keystores", {
                method: "POST",
                body: JSON.stringify(outObj),
                headers: new Headers({ "content-type": "application/json" }),
            });
            if (res.status !== 200) {

            }
            await this.props.onKeyStoreChange();
        } catch (e) {
            console.error("error fetching data");
        }
        this.setState({
            waitingForPost: false,
        });
    }
}
