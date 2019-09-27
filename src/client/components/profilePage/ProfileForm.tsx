import React, { useState } from "react";
import profileDesc from "../../formDescription/profileDesc";
import buildData from "../../utility/buildData";
import FormBuilder from "../formElements/FormBuilder";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    onProfileChange: () => Promise<void>;
    //    keystoreNames: string[];
}

export default ({ onProfileChange, style, ...rest }: IProps) => {

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
        <div style={{ ...mainStyle, ...style }} {...rest}>
            <FormBuilder formDef={profileFormDef} currentData={currentProfile} handleData={handleData} />
            <button className="submitButton" disabled={waitingForPost} onClick={handleBuild}>Generate</button>
        </div>
    );
};
const mainStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateRows: "auto auto",
    justifyItems: "fill",
    alignItems: "center",
    gap: "4px 4px",
    padding: "4px",
};
