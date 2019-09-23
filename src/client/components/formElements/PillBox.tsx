import React from "react";
import { IOption } from "../../../interfaces/profile";
import Pill from "./Pill";

interface IProps {
    selectedOptions: IOption[];
    onRemoved: (newOptions: IOption[] | undefined) => void;
    className?: string;
}

export default ({ selectedOptions, onRemoved, className }: IProps) => {
    return (
        <div className={className}>
            {selectedOptions.map((option, index) => {
                return (
                    <Pill key={index} onClick={() => {
                        const newOptions = selectedOptions.filter((item) => {
                            return item.key !== option.key;
                        });
                        onRemoved(newOptions.length > 0 ? newOptions : undefined);
                    }}>
                        {`${option.key} ${option.value}`}
                    </Pill>
                );
            })}
        </div>
    );
};
