import React from "react";


interface Props {
    onClick: (event: any, optionID: string) => void;
    id: any;
    children?: any;
}

export default ({ onClick, id, children }: Props) => {
    return (
        <span className="pill" onClick={(e) => onClick(e, id)} >
            {children}<span style={{ cursor: "pointer" }}> X</span>
        </span>
    );
}


