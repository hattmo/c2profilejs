import React, { useState } from "react";
import { IOptionSelectText } from "../../../../interfaces/formInterfaces";
import { IOption } from "../../../../interfaces/profile";
import PillBox from "../PillBox";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    path: string;
    options: IOptionSelectText[];
    selectedOptions: IOption[];
    onChanged: (path: string, options: IOption[] | undefined) => void;
}

export default ({ path, options, selectedOptions = [], onChanged, style, ...rest }: IProps) => {
    const [key, setKey] = useState(options[0].text);
    const [value, setValue] = useState("");

    const onAddClick = () => {
        const clearedOptions = selectedOptions.filter((item) => item.key !== key);
        onChanged(path, [...clearedOptions, { key, value }]);
        setValue("");
    };

    const validateInput = (): string => {
        if (value === "") {
            return "";
        } else {
            const found = options.find((val) => val.text === key);
            if (found) {
                return found.format.test(value) ? "goodInput" : "badInput";
            } else {
                return "badInput";
            }
        }
    };

    return (
        <div style={{ ...mainStyle, ...style }} {...rest}>
            <PillBox style={{ gridArea: "box" }}
                onRemoved={(newOptions) => { onChanged(path, newOptions); }}
                selectedOptions={selectedOptions} />
            <select value={key} onChange={(e) => setKey(e.currentTarget.value)} >
                {options.map((val) => {
                    return (
                        <option key={val.text}>
                            {val.text}
                        </option>
                    );
                })}
            </select>
            <input type="text" className={validateInput()} onChange={(e) => {
                setValue(e.currentTarget.value);
            }} value={value} />
            <button onClick={() => { onAddClick(); }}>
                Add
            </button>
        </div>
    );
};

const mainStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateAreas: '"box box box" "select input button"',
    gridTemplateColumns: "min-content auto 80px",
    gap: "4px 4px",

};
