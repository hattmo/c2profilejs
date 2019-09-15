import React from "react";
import { useState } from "react";

interface IProps {
    title: string;
    children?: any;
}

export default ({ title, children }: IProps) => {
    const [closed, setclosed] = useState(true);
    return (
        <div>
            <div onClick={() => {
                setclosed(!closed);
            }}>
                <h5 className="text-center" style={{ cursor: "pointer" }}>{title}</h5>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}