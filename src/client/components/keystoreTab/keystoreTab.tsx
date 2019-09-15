import React, { useEffect, useState } from "react";
import IKeystore from "../../../interfaces/keystore";
import CollapsablePanel from "../formElements/CollapsablePanel";
import KeystoreData from "./KeystoreData";
import KeystoreForm from "./KeystoreForm";

export default () => {
    const [keystores, setKeystores] = useState<IKeystore[]>([]);

    const checkForKeystores = async () => {
        const newKeystores = await (await fetch("/keystores", {
            method: "GET",
        })).json();
        setKeystores(newKeystores);
    };

    useEffect(() => {
        checkForKeystores();
    }, []);

    return (
        <div>
            <KeystoreForm keystoreNames={keystores.map((val) => val.keystore.id)}
                onKeyStoreChange={checkForKeystores} />
            <h4 className="text-center">Keystores</h4>
            <div>
                {keystores.map((val) => {
                    return (
                        <CollapsablePanel title={val.keystore.id} key={val.keystore.id} >
                            <KeystoreData ca={val.ca} dname={val.opt.dname} title={val.keystore.id} />
                        </CollapsablePanel>
                    );
                })}
            </div>
        </div>

    );
};
