import React from "react";
import { useState } from "react";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
}

export default ({ title, children, style, ...rest }: IProps) => {
    const [closed, setClosed] = useState(true);
    const contentStyle: React.CSSProperties = {
        display: closed ? "none" : "grid",
        gap: "4px 4px",
    };

    return (
        <div style={{ ...mainStyle, ...style }} {...rest} >
            <h2 style={{ textAlign: "center", cursor: "pointer" }} onClick={() => setClosed(!closed)}>{title} </h2>
            <div style={contentStyle}>
                {children}
            </div>
        </div >
    );
};

const mainStyle: React.CSSProperties = {
    display: "grid",
    borderStyle: "solid",
    borderWidth: "3px",
    borderRadius: "5px",
    gridTemplateAreas: '"title" "content"',
    gap: "4px 4px",
    padding: "4px",
};
