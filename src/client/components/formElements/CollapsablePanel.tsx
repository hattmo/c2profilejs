import React from "react";
import { useState } from "react";

interface IProps {
    title: string;
    children?: any;
}

export default ({ title, children }: IProps) => {
    const [closed, setclosed] = useState(true);
    return (
        <div className="collapseablePanel">
            <div onClick={() => {
                setclosed(!closed);
            }}>
                <h2 className="text-center" style={{ cursor: "pointer" }}>{title}</h5>
            </div>
            <div>
                {children}
            </div>
        </div>
    );
};
