import React, { useState } from "react";
import { OptionSelectText } from "../../../interfaces/formInterfaces";
import { Mutation } from "../../../interfaces/profile";
import Pill from "./Pill";


interface IProps {
    path: string;
    transformOptions: OptionSelectText[];
    terminationOptions: OptionSelectText[];
    currentMutation: Mutation;
    onChanged: (path: string, mutation: Mutation | undefined) => void;
}

export default ({ path, transformOptions, terminationOptions, currentMutation = {
    transform: [],
    termination: {
        key: "",
        value: "",
    },
}, onChanged, }: IProps) => {
    const [selectedTransformKey, setSelectedTransformKey] = useState(transformOptions[0].text);
    const [transformValue, setTransformValue] = useState("");

    const buildSelectedTransformOptions = () => {
        if (currentMutation.transform !== undefined) {
            return currentMutation.transform.map((val, index) => {
                return (
                    <div key={index}>
                        <Pill onClick={() => { onRemoveClicked(index) }}>{`${index + 1} ${val.key} ${val.value}`}</Pill>
                    </div>
                );
            });
        } else {
            return;
        }
    }
    const onRemoveClicked = (index: number) => {
        if (currentMutation.transform === undefined) {
            return;
        }
        const tempArr = [...currentMutation.transform];
        tempArr.splice(index, 1);
        if (tempArr.length === 0 && currentMutation.termination.key === "") {
            onChanged(path, undefined);
        } else {
            onChanged(path, {
                termination: currentMutation.termination,
                transform: tempArr,
            });
        }
    }

    const transformHasInput = () => {
        const found = transformOptions.find((val) => val.text === selectedTransformKey);
        if (found !== undefined) {
            return found.hasInput;
        } else {
            return false;
        }
    }

    const terminationHasInput = () => {
        const found = terminationOptions.find((val) => val.text === currentMutation.termination.key);
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
        setSelectedTransformKey(e.currentTarget.value);
        setTransformValue("");
    }
    const onTerminationSelected = (e: React.FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.value === "") {
            onChanged(path, undefined);
        } else {
            onChanged(path, {
                transform: currentMutation.transform,
                termination: {
                    key: e.currentTarget.value,
                    value: "",
                },
            });
        }
    }

    const onTransformTyped = (e: React.FormEvent<HTMLInputElement>) => {
        setTransformValue(e.currentTarget.value);
    }
    const onTerminationTyped = (e: React.FormEvent<HTMLInputElement>) => {

        onChanged(path, {
            transform: currentMutation.transform,
            termination: {
                key: currentMutation.termination.key,
                value: e.currentTarget.value,
            },
        });
    }

    const validateTransformInput = () => {
        if (transformValue === "") {
            return "";
        } else {
            const found = transformOptions.find((val) => val.text === selectedTransformKey)
            if (found !== undefined) {
                return found.format.test(transformValue) ? "goodInput" : "badInput";
            } else {
                return "badInput"
            }
        }
    }
    const validateTerminationInput = () => {
        if (currentMutation.termination.value === "") {
            return "";
        } else {
            const found = terminationOptions.find((val) => val.text === currentMutation.termination.key);
            if (found !== undefined) {
                return found.format.test(currentMutation.termination.value) ? "goodInput" : "badInput";
            } else {
                return "badInput";
            }
        }
    }


    return (
        <div>
            <select className={"selectTextDropDown"} value={selectedTransformKey}
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
            <select className={"selectTextDropDown"} value={currentMutation.termination.key}
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
                value={currentMutation.termination.value} />
            <button onClick={onAddClick}>Add</button>
            {buildSelectedTransformOptions()}
        </div>
    )
}