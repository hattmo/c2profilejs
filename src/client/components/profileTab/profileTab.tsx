import React, { useState, useEffect } from "react";
import IProfile from "../../../interfaces/profile";
import CollapsablePanel from "../formElements/CollapsablePanel";
import ProfileData from "./ProfileData";
import ProfileForm from "./ProfileForm";

export default () => {

    const [profiles, setProfiles] = useState<IProfile[]>([]);

    const checkForProfiles = async () => {
        const newProfiles = await (await fetch("/profiles", {
            method: "GET",
        })).json();
        setProfiles(newProfiles);
    };

    useEffect(() => {
        checkForProfiles();
    }, []);

    return (
        <div>
            <ProfileForm onProfileChange={checkForProfiles} />
            <h4>Profiles</h4>
            <div>
                {profiles.map((val) => {
                    return (
                        <CollapsablePanel title={val.name} key={val.name} >
                            <ProfileData title={val.name} />
                        </CollapsablePanel>
                    );
                })}
            </div>
        </div>
    );
};
