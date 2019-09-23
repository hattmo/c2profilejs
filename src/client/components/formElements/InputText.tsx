import React from "react";

interface IProps {
    path: string;
    label: string;
    format: RegExp;
    text: string;
    onChanged: (path: string, text: string | undefined) => void;
}

export default ({ path, label, format, text = "", onChanged }: IProps) => {
    const validate = () => {
        if (text === "") {
            return "";
        } else {
            return format.test(text) ? "goodInput" : "badInput";
        }
    };
    return (
        <div className="inputText">
            <div>
                {label}
            </div>
            <input className={`${validate()}`} type="text" onChange={(e) => {
                onChanged(path, e.currentTarget.value || undefined);
            }} value={text} />
        </div>
    );
};
