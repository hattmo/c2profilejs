import React, { useState } from "react";
import FormBuilder from "../formElements/FormBuilder";
import buildData from "../../utility/buildData";
import keystoreDesc from "../../formDescription/keystoreDesc";

interface IProp {
    onKeyStoreChange: () => Promise<void>;
    keystoreNames: string[];
}

export default ({ onKeyStoreChange, keystoreNames }: IProp) => {

    const [waitingForPost, setWaitingForPost] = useState(false);
    const [currentKeystore, setCurrentKeystore] = useState({});

    const handleData = (path: string, data: any) => {
        console.log(path, data);
        setCurrentKeystore({
            ...currentKeystore,
            [path]: data,
        });
    }

    const handleBuild = async () => {
        setWaitingForPost(true);
        const outObj = buildData(currentKeystore);
        try {
            const res = await fetch("/keystores", {
                method: "POST",
                body: JSON.stringify(outObj),
                headers: new Headers({ "content-type": "application/json" }),
            });
            if (res.status !== 200) {

            }
            await onKeyStoreChange();
        } catch (e) {
            console.error("error fetching data");
        }
        setWaitingForPost(false);
    }

    const keystoreFormDef = keystoreDesc(keystoreNames);

    return (
        <div>
            <FormBuilder formDef={keystoreFormDef} currentData={currentKeystore} handleData={handleData} />
            <button disabled={waitingForPost} onClick={handleBuild}>Generate</button>
        </div>
    );
}
