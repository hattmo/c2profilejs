import * as React from "react";
import { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import keystoreDesc from "../../formDescription/keystoreDesc";
import Keystore from "../../../interfaces/keystore";
import CollapsablePanel from "../utility/collapsablePanel";
import KeystoreData from "./keystoreData";
import KeystoreForm from "./keystoreForm";

interface State {
    keystores: Keystore[];
}
interface Props {

}
export default class KeystoreTab extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            keystores: [],
        };
        this.checkForKeystores = this.checkForKeystores.bind(this);
        this.buildPanels = this.buildPanels.bind(this);
    }

    public async checkForKeystores(): Promise<void> {
        const keystores = await (await fetch("/keystores", {
            method: "GET",
        })).json();
        this.setState({
            keystores,
        });
    }
    public async componentDidMount(): Promise<void> {
        await this.checkForKeystores();
    }
    public buildPanels(): JSX.Element[] {
        return this.state.keystores.map((val) => {
            return (
                <CollapsablePanel title={val.keystore.id} key={val.keystore.id} >
                    <KeystoreData ca={val.ca} dname={val.opt.dname} title={val.keystore.id} />
                </CollapsablePanel>
            );
        });
    }
    public render(): JSX.Element {
        return (
            <Container fluid>
                <Row>
                    <Col md="9">
                        <KeystoreForm formDef={keystoreDesc} keystoreNames={this.state.keystores.map((val) => val.keystore.id)} onKeyStoreChange={this.checkForKeystores} />
                    </Col>
                    <Col md="3">
                        <Container fluid>
                            <Row>
                                <Col sm="12">
                                    <h4 className="text-center">Keystores</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="12">
                                    {this.buildPanels()}
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        );
    }
}
