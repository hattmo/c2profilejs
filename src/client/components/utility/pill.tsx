import React from "react";


interface Props {
    onClick: () => void;
    children?: any;
}

export default ({ onClick, children }: Props) => {
    return (
        <span className="pill" onClick={() => onClick()} >
            {children}<span style={{ cursor: "pointer" }}> X</span>
        </span>
    );
}


