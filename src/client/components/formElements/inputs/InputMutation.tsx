import React, { useState } from "react";
import { IOptionSelectText } from "../../../../interfaces/formInterfaces";
import { IOption } from "../../../../interfaces/keystore";
import { IMutation } from "../../../../interfaces/profile";
import MutationBox from "../MutationBox";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    path: string;
    transformOptions: IOptionSelectText[];
    terminationOptions: IOptionSelectText[];
    onChanged: (path: string, mutation: IMutation | undefined) => void;
}

export default ({ path, transformOptions, terminationOptions, onChanged, style, ...rest }: IProps) => {
    const [transformKey, setTransformKey] = useState(transformOptions[0].text);
    const [transformValue, setTransformValue] = useState("");
    const [terminationKey, setTerminationKey] = useState(terminationOptions[0].text);
    const [terminationValue, setTerminationValue] = useState("");
    const [termination, setTermination] = useState<IOption>();
    const [transform, setTransform] = useState<IOption[]>([]);

    const transformHasInput = () => {
        const found = transformOptions.find((val) => val.text === transformKey);
        if (found !== undefined) {
            return found.hasInput;
        } else {
            return false;
        }
    };

    const terminationHasInput = () => {
        const found = terminationOptions.find((val) => val.text === terminationKey);
        if (found !== undefined) {
            return found.hasInput;
        } else {
            return false;
        }
    };

    const onTransformAdd = () => {
        setTransform([...transform, { key: transformKey, value: transformValue }]);
        if (termination !== undefined) {
            onChanged(path, {
                transform: [...transform, { key: transformKey, value: transformValue }],
                termination: {
                    key: terminationKey,
                    value: terminationValue,
                },
            });
        }
    };

    const onTerminationAdd = () => {
        setTermination({ key: terminationKey, value: terminationValue });
        onChanged(path, {
            transform: transform.length > 0 ? transform : undefined,
            termination: {
                key: terminationKey,
                value: terminationValue,
            },
        });
    };
    const onTransformSelected = (e: React.FormEvent<HTMLInputElement>) => {
        setTransformKey(e.currentTarget.value);
        setTransformValue("");
    };
    const onTerminationSelected = (e: React.FormEvent<HTMLInputElement>) => {
        setTerminationKey(e.currentTarget.value);
        setTerminationValue("");
    };

    const onTransformTyped = (e: React.FormEvent<HTMLInputElement>) => {
        setTransformValue(e.currentTarget.value);
    };
    const onTerminationTyped = (e: React.FormEvent<HTMLInputElement>) => {
        setTerminationValue(e.currentTarget.value);
    };

    const validateTransformInput = () => {
        if (transformValue === "") {
            return "";
        } else {
            const found = transformOptions.find((val) => val.text === transformKey);
            if (found !== undefined) {
                return found.format.test(transformValue) ? "goodInput" : "badInput";
            } else {
                return "badInput";
            }
        }
    };
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
    };

    return (
        <div style={{ ...mainStyle, ...style }} {...rest}>
            <select value={transformKey}
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
            <button onClick={onTransformAdd}>Add</button>
            <select value={terminationKey}
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
            <button onClick={onTerminationAdd}>Add</button>
            <MutationBox style={{ gridArea: "box" }} transform={transform} termination={termination}
                onTerminationChanged={() => {
                    setTermination(undefined);
                    onChanged(path, undefined);
                }} onTransformChanged={(newTransform) => {
                    setTransform(newTransform);
                    if (termination !== undefined) {
                        onChanged(path, {
                            transform: newTransform.length > 0 ? newTransform : undefined,
                            termination: {
                                key: terminationKey,
                                value: terminationValue,
                            },
                        });
                    }
                }} />
        </div>
    );
};

const mainStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateAreas: '"select input button" "select input button" "box box box"',
    gap: "4px 4px",
    gridTemplateColumns: "min-content auto 80px",
};
