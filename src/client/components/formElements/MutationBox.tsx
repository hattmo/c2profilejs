
import React from "react";
import { IOption } from "../../../interfaces/profile";
import Mutation from "./Mutation";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    transform: IOption[];
    termination?: IOption;
    onTransformChanged: (newTransform: IOption[]) => void;
    onTerminationChanged: () => void;
}

export default ({ transform, termination, onTransformChanged, onTerminationChanged, style, ...rest }: IProps) => {
    return (
        <div style={termination !== undefined || transform.length > 0 ? { ...mainStyle, ...style } : style} {...rest}>
            {
                transform.map((item, index) => {
                    return (<Mutation key={index} onClick={() => {
                        onTransformChanged(transform.filter((_item, i) => index !== i));
                    }} >
                        {`${index + 1} - ${item.key}${item.value ? ": " + item.value : ""}`}
                    </Mutation>);
                })
            }{
                termination ? <Mutation key={0} onClick={() => {
                    onTerminationChanged();
                }} >
                    {`Term - ${termination.key}${termination.value ? ": " + termination.value : ""} `}
                </Mutation> : null
            }
        </div >
    );
};

const mainStyle: React.CSSProperties = {
    display: "grid",
    padding: "4px",
    gap: "4px 4px",
    borderWidth: "1px",
    borderStyle: "solid",
    backgroundColor: "lightblue",
};
