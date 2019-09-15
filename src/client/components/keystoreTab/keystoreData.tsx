import React from "react";
import { Option } from "../../../interfaces/keystore";

interface IProps {
    title: string;
    dname: Option[];
    ca?: string;
}


export default ({ title, dname, ca }: IProps) => {
    const buildOptDName = () => {
        let out = "";
        dname.forEach((val) => {
            out += `${val.key}=${val.value}, `;
        });
        return out.slice(0, out.length - 2);
    }

    return (
        <div>
            dname: {buildOptDName()}<br />
            {ca ? "Signed" : "Self-Signed"}<br />
            <a href={`/keystores/${title}?download=true`}>download</a>
        </div>
    );

}