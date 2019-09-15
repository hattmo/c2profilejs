import React, { useState, useEffect } from "react";
import Keystore from "../../../interfaces/keystore";
import CollapsablePanel from "../formElements/CollapsablePanel";
import KeystoreData from "./KeystoreData";
import KeystoreForm from "./KeystoreForm";


export default () => {
    const [keystores, setKeystores] = useState<Keystore[]>([]);

    const checkForKeystores = async () => {
        const newKeystores = await (await fetch("/keystores", {
            method: "GET",
        })).json();
        setKeystores(newKeystores)
    }

    useEffect(() => {
        checkForKeystores();
    }, [])
    const buildPanels = () => {
        return keystores.map((val) => {
            return (
                <CollapsablePanel title={val.keystore.id} key={val.keystore.id} >
                    <KeystoreData ca={val.ca} dname={val.opt.dname} title={val.keystore.id} />
                </CollapsablePanel>
            );
        });
    }

    return (
        <div>
            <KeystoreForm keystoreNames={keystores.map((val) => val.keystore.id)} onKeyStoreChange={checkForKeystores} />
            <h4 className="text-center">Keystores</h4>
            <div>
                {buildPanels()}
            </div>
        </div>

    )
}