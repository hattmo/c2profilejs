import React, { useState } from "react";
import { IOption } from "../../../../interfaces/profile";
import PillBox from "../PillBox";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    path: string;
    label: string;
    formatKey: RegExp;
    formatValue: RegExp;
    selectedOptions: IOption[];
    onChanged: (path: string, options: IOption[] | undefined) => void;
}

export default ({ path, label, formatKey, formatValue, selectedOptions = [], onChanged, style, ...rest }: IProps) => {
    const [key, setKey] = useState("");
    const [value, setValue] = useState("");

    const onAddClick = () => {
        const filteredOptions = selectedOptions.filter((item) => item.key !== key);
        onChanged(path, [...filteredOptions, { key, value }]);
        setKey("");
        setValue("");
    };

    const validateKey = () => {
        if (key === "") {
            return "";
        } else {
            return formatKey.test(key) ? "goodInput" : "badInput";
        }
    };
    const validateValue = () => {
        if (value === "") {
            return "";
        } else {
            return formatValue.test(value) ? "goodInput" : "badInput";
        }
    };

    return (
        <div style={{ ...mainStyle, ...style }} {...rest}>
            <PillBox style={{ gridArea: "box" }} selectedOptions={selectedOptions}
                onRemoved={(newOptions) => { onChanged(path, newOptions); }} />
            <div>
                {label}
            </div>
            <input type="text" className={validateKey()} onChange={(e) => {
                setKey(e.currentTarget.value);
            }} value={key} />
            <input type="text" className={validateValue()} onChange={(e) => {
                setValue(e.currentTarget.value);
            }} value={value} />
            <button onClick={() => onAddClick()}>
                Add
            </button>
        </div>
    );
};

const mainStyle = {
    display: "grid",
    gridTemplateAreas: '"box box box box" "label input input button"',
    gridTemplateColumns: "90px auto auto 80px",
    gap: "4px 4px",
};
