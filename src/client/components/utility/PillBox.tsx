import React from "react";
import { Option } from "../../../interfaces/profile";
import Pill from "./Pill";

interface IProps {
    selectedOptions: Option[];
    onRemoved: (newOptions: Option[] | undefined) => void;
    className?: string;
}

export default ({ selectedOptions, onRemoved, className }: IProps) => {
    return (
        <div className={className}>
            {selectedOptions.map((option, index) => {
                return (
                    <Pill key={index} onClick={() => {
                        const newOptions = selectedOptions.filter(item => {
                            return item.key !== option.key
                        })
                        onRemoved(newOptions.length > 0 ? newOptions : undefined)
                    }}>
                    </Pill>
                )
            })}
        </div>
    )
}