import React, { useState } from "react";
import backButton from "../../../../assets/back.png";
import forwardButton from "../../../../assets/forward.png";

interface IProps {
    content?: React.ReactNode;
    navLinks: React.ReactNode[];
}
export default ({ content, navLinks }: IProps) => {
    const [collapsed, setCollapsed] = useState(true);
    return (
        <div style={{
            ...mainStyle,
            gridTemplateColumns: collapsed ? "60px 0px" : "60px 300px",
        }}>
            {collapsed ?
                <div style={buttonStyle} onClick={() => { setCollapsed(false); }}>
                    <img src={`${window.APP_ROOT}${backButton}`}></img>
                </div> :
                <div style={buttonStyle} onClick={() => { setCollapsed(true); }}>
                    <img src={`${window.APP_ROOT}${forwardButton}`}></img>
                </div>}
            <div style={{ ...contentStyle, display: collapsed ? "none" : "grid" }}>
                <div style={navStyle}>
                    {navLinks}
                </div>
                <div style={{ borderStyle: "solid", borderWidth: "2px", width: "100%" }} />
                {content}
            </div>
        </div>
    );
};

const mainStyle: React.CSSProperties = {
    display: "grid",
    position: "fixed",
    backgroundColor: "rgba(100, 100, 255, 0.5)",
    height: "100vh",
    right: "0px",
    top: "0px",
};

const buttonStyle: React.CSSProperties = {
    display: "grid",
    placeItems: "center center",
    height: "100%",
    width: "100%",
};

const contentStyle: React.CSSProperties = {
    gridTemplateRows: "min-content 4px auto",
    justifyItems: "stretch",
    padding: "4px",
    gap: "4px",
};

const navStyle: React.CSSProperties = {
    display: "grid",
    gridAutoRows: "60px",
    placeItems: "stretch stretch",
    gap: "4px",
};
