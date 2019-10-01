import React from "react";
import IKeystore from "../../../interfaces/keystore";
import CollapsablePanel from "../formElements/panels/CollapsablePanel";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    keystores: IKeystore[];
}

export default ({ keystores, style, ...rest }: IProps) => {
    const buildOptDName = (keystore: IKeystore) => {
        let out = "";
        keystore.opt.dname.forEach((val) => {
            out += `${val.key}=${val.value}, `;
        });
        return out.slice(0, out.length - 2);
    };

    return (
        <div style={{ ...mainStyle, ...style }} {...rest}>
            {keystores.map((val) => {
                return (
                    <CollapsablePanel style={{backgroundColor: "white"}} title={val.keystore.id} key={val.keystore.id} >
                        <div>
                            dname: {buildOptDName(val)}<br />
                            {val.ca ? "Signed" : "Self-Signed"}<br />
                            <a href={`${window.APP_ROOT}/api/keystores/${val.keystore.id}?download=true`}>download</a>
                        </div>
                    </CollapsablePanel>
                );
            })}
        </div>
    );
};

const mainStyle: React.CSSProperties = {
    display: "grid",
    gap: "4px",
    gridAutoRows: "min-content",
};
