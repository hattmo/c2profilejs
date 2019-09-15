import React, { useState } from "react";

interface IProps {
    path: string;
    label: string;
    selectedVal?: string;
    keystoreNames: string[];
    onChanged: (path: string, text: string | undefined) => void;
}

export default ({ path, label, selectedVal = "", keystoreNames, onChanged }: IProps) => {
    const [isChecked, setIsChecked] = useState(false);
    return (
        <div className="inputSignKeystore" >

            <div>
                {label}
            </div>
            <input type="checkbox" disabled={!keystoreNames.length} onChange={(e) => {
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
