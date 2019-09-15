import React, { useState } from "react";
import keystoreDesc from "../../formDescription/keystoreDesc";
import buildData from "../../utility/buildData";
import FormBuilder from "../formElements/FormBuilder";

interface IProp {
    onKeyStoreChange: () => Promise<void>;
    keystoreNames: string[];
}

export default ({ onKeyStoreChange, keystoreNames }: IProp) => {

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
            await fetch("/keystores", {
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
        <div>
            <FormBuilder formDef={keystoreFormDef} currentData={currentKeystore} handleData={handleData} />
            <button disabled={waitingForPost} onClick={handleBuild}>Generate</button>
        </div>
    );
};
