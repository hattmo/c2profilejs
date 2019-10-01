import React, { useState } from "react";
import profileDesc from "../../formDescription/profileDesc";
import buildData from "../../utility/buildData";
import FormBuilder from "../formElements/FormBuilder";
import ErrorModal from "../errors/ErrorModal";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    onProfileChange: () => Promise<void>;
    //    keystoreNames: string[];
}

export default ({ onProfileChange, style, ...rest }: IProps) => {

    const [waitingForPost, setWaitingForPost] = useState(false);
    const [currentProfile, setCurrentProfile] = useState({});
    const [errorState, setErrorState] = useState("");

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
            const res = await fetch(`${window.APP_ROOT}/api/profiles`, {
                method: "POST",
                body: JSON.stringify(outObj),
                headers: new Headers({ "content-type": "application/json" }),
            });
            if (!res.ok) { setErrorState((await res.json()).errorMessage); }
            onProfileChange();
        } catch (e) {
            setErrorState("Unkown code");
        }
        setWaitingForPost(false);
    };

    const profileFormDef = profileDesc();
    return (
        <div style={{ ...mainStyle, ...style }} {...rest}>
            {errorState !== "" ? <ErrorModal onLeave={() => setErrorState("")}>{errorState}</ErrorModal> : null}
            <FormBuilder formDef={profileFormDef} currentData={currentProfile} handleData={handleData} />
            <button className="submitButton" disabled={waitingForPost} onClick={handleBuild}>
                {waitingForPost ? "Generating..." : "Generate"}
            </button>
        </div>
    );
};
const mainStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateRows: "max-content min-content",
    justifyItems: "fill",
    gap: "4px",
};
