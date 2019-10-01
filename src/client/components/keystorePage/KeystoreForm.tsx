import React, { useState } from "react";
import keystoreDesc from "../../formDescription/keystoreDesc";
import buildData from "../../utility/buildData";
import FormBuilder from "../formElements/FormBuilder";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    onKeyStoreChange: () => Promise<void>;
    keystoreNames: string[];
}

export default ({ onKeyStoreChange, keystoreNames, style, ...rest }: IProps) => {

    const [waitingForPost, setWaitingForPost] = useState(false);
    const [currentKeystore, setCurrentKeystore] = useState({});

    const handleData = (path: string, data: any) => {
        setCurrentKeystore({
            ...currentKeystore,
            [path]: data,
        });
    };

    const handleBuild = async () => {
        setWaitingForPost(true);
        const outObj = buildData(currentKeystore);
        try {
            await fetch(`${window.APP_ROOT}/api/keystores`, {
                method: "POST",
                body: JSON.stringify(outObj),
                headers: new Headers({ "content-type": "application/json" }),
            });
            await onKeyStoreChange();
        } catch (e) {
            process.stderr.write("Failed to submit new keystore\n");
        }
        setWaitingForPost(false);
    };

    const keystoreFormDef = keystoreDesc(keystoreNames);

    return (
        <div style={{ ...mainStyle, ...style }} {...rest}>
            <FormBuilder formDef={keystoreFormDef} currentData={currentKeystore} handleData={handleData} />
            <button className="submitButton" disabled={waitingForPost} onClick={handleBuild}>
                {waitingForPost ? "Generating..." : "Generate"}
            </button>
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
