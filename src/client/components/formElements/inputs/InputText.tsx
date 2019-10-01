import React from "react";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    path: string;
    label: string;
    format: RegExp;
    text: string;
    onChanged: (path: string, text: string | undefined) => void;
}

export default ({ path, label, format, text = "", onChanged, style, ...rest }: IProps) => {
    const validate = () => {
        if (text === "") {
            return "";
        } else {
            return format.test(text) ? "goodInput" : "badInput";
        }
    };
    return (
        <div style={{ ...mainStyle, ...style }} {...rest}>
            <div>
                {label}
            </div>
            <input className={`${validate()}`} type="text" onChange={(e) => {
                onChanged(path, e.currentTarget.value || undefined);
            }} value={text} />
        </div >
    );
};

const mainStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "80px auto",
    columnGap: "3px",
};
