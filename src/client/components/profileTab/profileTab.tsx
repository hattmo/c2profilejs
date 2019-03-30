import * as React from "react";
import { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import cobaltStrikeProfile from "../../formDescription/profileDesc";
import ProfileInf from "../../interfaces/profile";
import CollapsablePanel from "../utility/collapsablePanel";
import ProfileData from "./profileData";
import ProfileForm from "./profileForm";
interface State {
    profiles: ProfileInf[];
}
interface Props {

}
export default class ProfileTab extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            profiles: [],
        };
        this.checkForProfiles = this.checkForProfiles.bind(this);
        this.buildPanels = this.buildPanels.bind(this);
    }
    public async checkForProfiles(): Promise<void> {
        const profiles = await (await fetch("/profiles", {
            method: "GET",
        })).json();
        this.setState({
            profiles,
        });
    }
    public async componentDidMount(): Promise<void> {
        await this.checkForProfiles();
    }
    public buildPanels(): JSX.Element[] {
        return this.state.profiles.map((val) => {
            return (
                <CollapsablePanel title={val.name} key={val.name} >
                    <ProfileData title={val.name} />
                </CollapsablePanel>
            );
        });
    }

    public render(): JSX.Element {
        return (
            <Container fluid>
                <Row>
                    <Col md="9">
                        <ProfileForm onProfileChange={this.checkForProfiles} formDef={cobaltStrikeProfile} />
                    </Col>
                    <Col md="3">
                        <Container fluid>
                            <Row>
                                <Col sm="12">
                                    <h4 className="text-center">Profiles</h4>
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
