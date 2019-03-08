import * as React from 'react';
import { Tabs } from 'react-bootstrap';
import { Tab } from 'react-bootstrap';
import KeystoreTab from './keystoreTab/keystoreTab';
import Pill from './profileTab/pill';
class Main extends React.Component {

    render(): React.ReactNode {
        return (
            <Tabs defaultActiveKey="profiles" id="mainTabs">
                <Tab eventKey="profiles" title="Profiles">
                    <Pill/>
                </Tab>
                <Tab eventKey="keystores" title="Keystores">
                    <KeystoreTab />
                </Tab>
                <Tab eventKey="about" title="About">
                    Hello about
                </Tab>
            </Tabs>
        )
    }
}

export default Main;