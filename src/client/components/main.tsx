import React from "react";
import { BrowserRouter as Router, NavLink, Redirect, Route, Switch } from "react-router-dom";
import Error404 from "./errors/404";

class Main extends React.Component {

    public render(): React.ReactNode {
        return (
            <Router>
                <div>
                    <div>
                        <NavLink to="/profile">Profile</NavLink>
                        <NavLink to="/keystore">Keystore</NavLink>
                        <NavLink to="/about">About</NavLink>
                    </div>
                    <div>
                        <Switch>
                            <Route path="/" exact render={() => {
                                return (
                                    <Redirect to="/profile" />
                                );
                            }} />
                            <Route path="/profile" />
                            <Route path="/keystore" />
                            <Route path="/about" />
                            <Route component={Error404} />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default Main;
