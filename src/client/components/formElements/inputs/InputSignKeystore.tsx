import React, { useState } from "react";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    path: string;
    label: string;
    selectedVal?: string;
    keystoreNames: string[];
    onChanged: (path: string, text: string | undefined) => void;
}

export default ({ path, label, selectedVal = "", keystoreNames, onChanged, style, ...rest }: IProps) => {
    const [isChecked, setIsChecked] = useState(false);
    return (
        <div style={{ ...mainStyle, ...style }}{...rest}  >

            <div>
                {label}
            </div>
            <input style={{ alignSelf: "center" }} type="checkbox" disabled={!keystoreNames.length} onChange={(e) => {
                setIsChecked(e.currentTarget.checked);
                onChanged(path, undefined);
            }} />

            <select value={selectedVal} onChange={(e) => {
                onChanged(path, e.currentTarget.value);
            }} disabled={!isChecked}>
                <option key={""} value={""}></option>
                {keystoreNames.map((val) => {
                    return (<option key={val} value={val}>{val}</option>);
                })}
            </select>
        </div>
    );
};

const mainStyle = {
    display: "grid",
    gridTemplateColumns: "min-content min-content auto",
    gap: "4px 4px",
};
