import React, { useState } from "react";
import profileDesc from "../../formDescription/profileDesc";
import buildData from "../../utility/buildData";
import FormBuilder from "../formElements/FormBuilder";

interface IProps {
    onProfileChange: () => Promise<void>;
    keystoreNames: string[];
}

export default ({ onProfileChange }: IProps) => {

    const [waitingForPost, setWaitingForPost] = useState(false);
    const [currentProfile, setCurrentProfile] = useState({});

    const handleData = (path: string, data: any) => {
        setCurrentProfile({
            ...currentProfile,
            [path]: data,
        });
    };

    const handleBuild = async () => {
        setWaitingForPost(true);
        const outObj = buildData(currentProfile);
        try {
            await fetch("/api/profiles", {
                method: "POST",
                body: JSON.stringify(outObj),
                headers: new Headers({ "content-type": "application/json" }),
            });
            onProfileChange();
        } catch (e) {
            process.stderr.write("Failed to submit new profile\n");
        }
        setWaitingForPost(false);
    };

    const profileFormDef = profileDesc();

    return (
        <div className="form">
            <FormBuilder formDef={profileFormDef} currentData={currentProfile} handleData={handleData} />
            <button className="submitButton"  disabled={waitingForPost} onClick={handleBuild}>Generate</button>
        </div>
    );
};
