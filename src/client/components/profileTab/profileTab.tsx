import React, { useState } from "react";
import ProfileInf from "../../../interfaces/profile";
import CollapsablePanel from "../formElements/CollapsablePanel";
import ProfileData from "./ProfileData";
import ProfileForm from "./ProfileForm";

export default () => {

    const [profiles, setProfiles] = useState<ProfileInf[]>([]);

    const checkForProfiles = async () => {
        const profiles = await (await fetch("/profiles", {
            method: "GET",
        })).json();
        setProfiles(profiles);
    }

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
}

