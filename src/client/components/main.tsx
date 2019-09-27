import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Error404 from "./errors/404";
import SideBar from "./sidebar/SideBar";
import NavBar from "./navbar/NavBar";
import ProfileForm from "./profilePage/ProfileForm";
import KeystoreForm from "./keystorePage/KeystoreForm";
import AboutPage from "./aboutPage/AboutPage";
import IProfile from "../../interfaces/profile";
import IKeystore from "../../interfaces/keystore";
import KeystoreData from "./keystorePage/KeystoreData";
import ProfileData from "./profilePage/ProfileData";

export default () => {
    const [smallScreen, setSmallScreen] = useState(window.innerWidth <= 1000);
    const [profiles, setProfiles] = useState<IProfile[]>([]);
    const [keystores, setKeystores] = useState<IKeystore[]>([]);
    const checkForProfiles = async () => {
        const newProfiles = await (await fetch("/api/profiles", {
            method: "GET",
        })).json();
        setProfiles(newProfiles);
    };

    const checkForKeystores = async () => {
        const newKeystores = await (await fetch("/api/keystores", {
            method: "GET",
        })).json();
        setKeystores(newKeystores);
    };

    useEffect(() => {
        checkForProfiles();
        checkForKeystores();
    }, []);

    useEffect(() => {
        let resizeTimer;
        const resizeEvent = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                setSmallScreen(window.innerWidth <= 1000);
            }, 250);

        };
        window.addEventListener("resize", resizeEvent);
        return () => {
            window.removeEventListener("resize", resizeEvent);
        };
    }, []);
    return (
        <Router>
            <div className={smallScreen ? "mainSmall" : "main"}>
                {smallScreen ? (<SideBar >
                    <Switch>
                        <Route path="/profile">
                            <ProfileData profiles={profiles} />
                        </Route>
                        <Route path="/keystore">
                            <KeystoreData keystores={keystores} />
                        </Route>
                    </Switch>
                </SideBar>) : <NavBar />}
                <Switch>
                    <Route path="/" exact>
                        <Redirect to="/profile" />
                    </Route>
                    <Route path="/profile">
                        <ProfileForm onProfileChange={checkForProfiles} />
                    </Route>
                    <Route path="/keystore">
                        <KeystoreForm onKeyStoreChange={checkForKeystores}
                            keystoreNames={keystores.map((i) => i.keystore.id)} />
                    </Route>
                    <Route path="/about" >
                        <AboutPage />
                    </Route>
                    <Route>
                        <Error404 />
                    </Route>
                </Switch>
                {!smallScreen ? (
                    <Switch>
                        <Route path="/profile">
                            <ProfileData profiles={profiles} />
                        </Route>
                        <Route path="/keystore">
                            <KeystoreData keystores={keystores} />
                        </Route>
                    </Switch>
                ) : null}
            </div>
        </Router>
    );
};
