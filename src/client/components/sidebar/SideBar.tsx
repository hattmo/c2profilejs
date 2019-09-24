import React, { useState } from "react";
import backButton from "../../../../assets/back.png";
import forwardButton from "../../../../assets/forward.png";
import { NavLink } from "react-router-dom";

export default () => {
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
                <div>
                    <NavLink to="/profile">Profile</NavLink>
                    <NavLink to="/keystore">Keystore</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div>
            </React.Fragment>
        );
    };
    return (
        <div className={collapsed ? "sidebar" : "sidebarOpen sidebar"}>
            {collapsed ? collapsedContent() : expandedContent()}
        </div>
    );
};
