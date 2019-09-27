import React, { useState } from "react";
import backButton from "../../../../assets/back.png";
import forwardButton from "../../../../assets/forward.png";
import { NavLink } from "react-router-dom";
export default ({ children, className = "", ...rest }: React.HTMLAttributes<HTMLDivElement>) => {
    const [collapsed, setCollapsed] = useState(true);

    const collapsedContent = () => {
        return (
            <div className="sidebarButton" onClick={() => { setCollapsed(false); }}>
                <img src={backButton}></img>
            </div>
        );
    };

    const expandedContent = () => {
        return (
            <React.Fragment>
                <div className="sidebarButton" onClick={() => { setCollapsed(true); }}>
                    <img src={forwardButton}></img>
                </div>
                <div className="sidebarLinks">
                    <NavLink className="navLink" to="/profile">Profile</NavLink>
                    <NavLink className="navLink" to="/keystore">Keystore</NavLink>
                    <NavLink className="navLink" to="/about">About</NavLink>
                </div>
                <div className="sidebarDivider" style={{ borderStyle: "solid", borderWidth: "5px" }} />
                <div className="sidebarContent">
                    {children}
                </div>
            </React.Fragment>
        );
    };
    return (
        <div className={`sidebar ${collapsed ? "" : "sidebarOpen"} ${className}`} {...rest}>
            {collapsed ? collapsedContent() : expandedContent()}
        </div>
    );
};
