import React from "react";
import IKeystore from "../../../interfaces/keystore";
import CollapsablePanel from "../formElements/CollapsablePanel";

interface IProps {
    keystores: IKeystore[];
}

export default ({ keystores }: IProps) => {
    const buildOptDName = (keystore: IKeystore) => {
        let out = "";
        keystore.opt.dname.forEach((val) => {
            out += `${val.key}=${val.value}, `;
        });
        return out.slice(0, out.length - 2);
    };

    return (
        keystores.map((val) => {
            return (
                <CollapsablePanel title={val.keystore.id} key={val.keystore.id} >
                    <div>
                        dname: {buildOptDName(val)}<br />
                        {val.ca ? "Signed" : "Self-Signed"}<br />
                        <a href={`/keystores/${val.keystore.id}?download=true`}>download</a>
                    </div>
                </CollapsablePanel>
            );
        })
    );
};
