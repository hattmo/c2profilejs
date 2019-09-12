import React, { useState } from "react";
import { OptionSelectText } from "../../../interfaces/formInterfaces";
import { Mutation } from "../../../interfaces/profile";
import { Option } from "../../../interfaces/keystore";
import MutationBox from "./MutationBox";


interface IProps {
    path: string;
    transformOptions: OptionSelectText[];
    terminationOptions: OptionSelectText[];
    currentMutation: Mutation;
    onChanged: (path: string, mutation: Mutation | undefined) => void;
}

export default ({ path, transformOptions, terminationOptions, onChanged }: IProps) => {
    const [transformKey, setTransformKey] = useState(transformOptions[0].text);
    const [transformValue, setTransformValue] = useState("");
    const [terminationKey, setTerminationKey] = useState(terminationOptions[0].text);
    const [terminationValue, setTerminationValue] = useState("");
    const [termination, setTermination] = useState<Option>();
    const [transform, setTransform] = useState<Option[]>([]);

    const transformHasInput = () => {
        const found = transformOptions.find((val) => val.text === transformKey);
        if (found !== undefined) {
            return found.hasInput;
        } else {
            return false;
        }
    }

    const terminationHasInput = () => {
        const found = terminationOptions.find((val) => val.text === transformKey);
        if (found !== undefined) {
            return found.hasInput;
        } else {
            return false;
        }
    }

    const onAddClick = () => {
        const key = selectedTransformKey;
        const value = transformValue;
        let tempArr;
        if (currentMutation.transform !== undefined) {
            tempArr = [...currentMutation.transform];
        } else {
            tempArr = []
        }
        tempArr.push({
            key,
            value,
        });
        const newMutation: Mutation = {
            transform: tempArr,
            termination: currentMutation.termination,
        };
        onChanged(path, newMutation);
    }

    const onTransformSelected = (e: React.FormEvent<HTMLInputElement>) => {
        setTransformKey(e.currentTarget.value);
        setTransformValue("");
    }
    const onTerminationSelected = (e: React.FormEvent<HTMLInputElement>) => {
        setTerminationKey(e.currentTarget.value);
        setTerminationValue("");
    }

    const onTransformTyped = (e: React.FormEvent<HTMLInputElement>) => {
        setTransformValue(e.currentTarget.value);
    }
    const onTerminationTyped = (e: React.FormEvent<HTMLInputElement>) => {
        setTerminationValue(e.currentTarget.value);
    }

    const validateTransformInput = () => {
        if (transformValue === "") {
            return "";
        } else {
            const found = transformOptions.find((val) => val.text === transformKey)
            if (found !== undefined) {
                return found.format.test(transformValue) ? "goodInput" : "badInput";
            } else {
                return "badInput"
            }
        }
    }
    const validateTerminationInput = () => {
        if (terminationValue === "") {
            return "";
        } else {
            const found = terminationOptions.find((val) => val.text === terminationKey);
            if (found !== undefined) {
                return found.format.test(terminationValue) ? "goodInput" : "badInput";
            } else {
                return "badInput";
            }
        }
    }


    return (
        <div>
            <select className={"selectTextDropDown"} value={transformKey}
                onChange={(e: any) => onTransformSelected(e)}>
                {transformOptions.map((val) => {
                    return (
                        <option key={val.text}>
                            {val.text}
                        </option>
                    );
                })}
            </select>
            <input type="text" disabled={!transformHasInput()} className={validateTransformInput()}
                onChange={(e) => { onTransformTyped(e); }}
                value={transformValue} />
            <button onClick={onAddClick}>Add</button>
            <select className={"selectTextDropDown"} value={terminationKey}
                onChange={(e: any) => onTerminationSelected(e)} >
                {terminationOptions.map((val) => {
                    return (
                        <option key={val.text}>
                            {val.text}
                        </option>
                    );
                })}
            </select>
            <input type="text" disabled={!terminationHasInput()} className={validateTerminationInput()}
                onChange={(e) => { onTerminationTyped(e); }}
                value={terminationValue} />
            <button onClick={onAddClick}>Add</button>
            <MutationBox transform={transform} termination={termination} onTerminationChanged={() => { setTermination(undefined) }}} />
        </div>
    )
}