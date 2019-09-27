import React from "react";
import { IOption } from "../../../interfaces/profile";
import Pill from "./Pill";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    selectedOptions: IOption[];
    onRemoved: (newOptions: IOption[] | undefined) => void;
}

export default ({ selectedOptions, onRemoved, style, ...rest }: IProps) => {
    return (
        <div style={selectedOptions.length > 0 ? { ...mainStyle, ...style } : style} {...rest}>
            {selectedOptions.map((option, index) => {
                return (
                    <Pill key={index} onClick={() => {
                        const newOptions = selectedOptions.filter((item) => {
                            return item.key !== option.key;
                        });
                        onRemoved(newOptions.length > 0 ? newOptions : undefined);
                    }}>
                        {`${option.key} : ${option.value}`}
                    </Pill>
                );
            })}
        </div>
    );
};

const mainStyle: React.CSSProperties = {
    borderWidth: "1px",
    borderStyle: "solid",
    backgroundColor: "lightblue",
};
