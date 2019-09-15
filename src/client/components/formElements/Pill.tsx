import React from "react";

interface IProps {
    onClick: () => void;
    children?: any;
}

export default ({ onClick, children }: IProps) => {
    return (
        <span className="pill" onClick={() => onClick()} >
            {children}<span style={{ cursor: "pointer" }}> X</span>
        </span>
    );
};
