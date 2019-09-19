import React from "react";
import { useState } from "react";

interface IProps {
    title: string;
    children?: any;
}

export default ({ title, children }: IProps) => {
    const [closed, setClosed] = useState(true);
    return (
        <div className={`collapseablePanel ${closed ? "closed" : "open"}`} >
            <h2 className="title" style={{ cursor: "pointer" }} onClick={() => setClosed(!closed)}>{title} </h2>
            <div className="content">
                {children}
            </div>
        </div >
    );
};
