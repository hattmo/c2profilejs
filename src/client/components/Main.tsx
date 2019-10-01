import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, NavLink, Redirect } from "react-router-dom";
import ProfileForm from "./profilePage/ProfileForm";
import IProfile from "../../interfaces/profile";
import IKeystore from "../../interfaces/keystore";
import ProfileData from "./profilePage/ProfileData";
import TwoContentWithNav from "./pageLayouts/TwoContentWithNav";
import KeystoreForm from "./keystorePage/KeystoreForm";
import KeystoreData from "./keystorePage/KeystoreData";
import Error404 from "./errors/Error404";
import OneContentWithNav from "./pageLayouts/OneContentWithNav";
import AboutPage from "./aboutPage/AboutPage";

export default ({}) => {
    const [smallScreen, setSmallScreen] = useState(window.innerWidth <= 1000);
    const [profiles, setProfiles] = useState<IProfile[]>([]);
    const [keystores, setKeystores] = useState<IKeystore[]>([]);
    const checkForProfiles = async () => {
        const newProfiles = await (await fetch(`${window.APP_ROOT}/api/profiles`, {
            method: "GET",
        })).json();
        setProfiles(newProfiles);
    };

    const checkForKeystores = async () => {
        const newKeystores = await (await fetch(`${window.APP_ROOT}/api/keystores`, {
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

    const navLinks = [
        <NavLink activeClassName="active" className="navLink" key={0} to="/profile">Profile</NavLink>,
        <NavLink activeClassName="active" className="navLink" key={1} to="/keystore">Keystore</NavLink>,
        <NavLink activeClassName="active" className="navLink" key={2} to="/about">About</NavLink>,
    ];

    const profileMainContent = (
        <ProfileForm onProfileChange={async () => { await checkForProfiles(); }} />
    );

    const profileAltContent = (
        <ProfileData profiles={profiles} />
    );
    const keystoreMainContent = (
        <KeystoreForm keystoreNames={keystores.map((k) => k.keystore.id)}
            onKeyStoreChange={async () => { await checkForKeystores(); }} />
    );

    const keystoreAltContent = (
        <KeystoreData keystores={keystores} />
    );
    return (
        <Router basename={window.APP_ROOT}>
            <Switch>
                <Route path="/" exact>
                    <Redirect to="/profile" />
                </Route>
                <Route path="/profile" exact>
                    <TwoContentWithNav small={smallScreen}
                        altContent={profileAltContent}
                        mainContent={profileMainContent}
                        navLinks={navLinks} />
                </Route>
                <Route path="/keystore" exact>
                    <TwoContentWithNav small={smallScreen}
                        altContent={keystoreAltContent}
                        mainContent={keystoreMainContent}
                        navLinks={navLinks} />
                </Route>
                <Route path="/about" exact>
                    <OneContentWithNav small={smallScreen}
                        mainContent={<AboutPage />}
                        navLinks={navLinks} />
                </Route>
                <Route>
                    <Error404 />
                </Route>
            </Switch>
        </Router>
    );
};
