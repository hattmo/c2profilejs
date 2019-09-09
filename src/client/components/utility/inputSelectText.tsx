import React, { useState } from "react";
import { OptionSelectText } from "../../../interfaces/formInterfaces";
import { Option } from "../../../interfaces/profile";
import PillBox from "./PillBox";

interface IProps {
    path: string;
    options: OptionSelectText[];
    selectedOptions: Option[];
    onChanged: (path: string, options: Option[] | undefined) => void;
}


export default ({ path, options, selectedOptions = [], onChanged }: IProps) => {
    const [key, setKey] = useState(options[0].text);
    const [value, setValue] = useState("");

    const onAddClick = () => {
        const clearedOptions = selectedOptions.filter((item) => item.key !== key);
        onChanged(path, [...clearedOptions, { key, value }])
        setValue("");
    }

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
    }

    return (
        <div>
            <PillBox onRemoved={(newOptions) => { onChanged(path, newOptions) }} selectedOptions={selectedOptions} />
            <select value={key} onChange={(e) => setKey(e.currentTarget.value)} >
                {options.map((val) => {
                    return (
                        <option key={val.text}>
                            {val.text}
                        </option>
                    );
                })}
            </select>
            <input type="text" className={validateInput()} onChange={(e) => { setValue(e.currentTarget.value) }} value={value} />
            <button onClick={() => { onAddClick() }}>
                Add
            </button>
        </div>
    )
}