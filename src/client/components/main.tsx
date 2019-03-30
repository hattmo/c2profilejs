import * as React from "react";
import { Tabs } from "react-bootstrap";
import { Tab } from "react-bootstrap";
import KeystoreTab from "./keystoreTab/keystoreTab";
import ProfileTab from "./profileTab/profileTab";
class Main extends React.Component {

    public render(): React.ReactNode {
        return (
            <Tabs defaultActiveKey="profiles" id="mainTabs">
                <Tab eventKey="profiles" title="Profiles">
                  <ProfileTab/>
                </Tab>
                <Tab eventKey="keystores" title="Keystores">
                    <KeystoreTab />
                </Tab>
                <Tab eventKey="about" title="About">
                    Created By Oscar
                </Tab>
            </Tabs>
        );
    }
}

export default Main;
