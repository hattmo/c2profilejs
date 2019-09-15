import React, { useState } from "react";
import FormBuilder from "../formElements/FormBuilder";
import buildData from "../../utility/buildData";
import profileDesc from "../../formDescription/profileDesc";

interface IProps {
    onProfileChange: () => Promise<void>;
}

export default ({ onProfileChange }: IProps) => {

    const [waitingForPost, setWaitingForPost] = useState(false);
    const [currentProfile, setCurrentProfile] = useState({});

    const handleData = (path: string, data: any) => {
        setCurrentProfile({
            ...currentProfile,
            [path]: data
        })
    }

    const handleBuild = async () => {
        setWaitingForPost(true);
        const outObj = buildData(currentProfile);
        try {
            const res = await fetch("/profiles", {
                method: "POST",
                body: JSON.stringify(outObj),
                headers: new Headers({ "content-type": "application/json" }),
            });
            if (res.status !== 200) {

            }
            await onProfileChange();
        } catch (e) {
            console.error("error fetching data");
        }
        setWaitingForPost(false);
    }

    const profileFormDef = profileDesc();

    return (
        <div>
            <FormBuilder formDef={profileFormDef} currentData={currentProfile} handleData={handleData} />
            <button disabled={waitingForPost} onClick={handleBuild}>Generate</button>
        </div>
    );
}
