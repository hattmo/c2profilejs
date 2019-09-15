import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

class Main extends React.Component {

    public render(): React.ReactNode {
        return (
            <Router>
                <Switch>
                    <Route  path="/" exact render={()=>{
                        return(
                            <Redirect to="/profile"/>
                        )
                    }}/>
                    <Route path="/profile" />
                    <Route path="/keystore" />
                    <Route path="/about" />
                </Switch>
            </Router>
        );
    }
}

export default Main;
/**
 *             <Tabs defaultActiveKey="profiles" id="mainTabs">
                <Tab eventKey="profiles" title="Profiles">
                  <ProfileTab/>
                </Tab>
                <Tab eventKey="keystores" title="Keystores">
                    <KeystoreTab/>
                </Tab>
                <Tab eventKey="about" title="About">
                    Created By Oscar
                </Tab>
            </Tabs>
 */