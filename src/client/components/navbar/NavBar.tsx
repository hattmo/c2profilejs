import React from "react";
import { NavLink } from "react-router-dom";

export default () => {
    return (
        <div className="navbar">
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/keystore">Keystore</NavLink>
            <NavLink to="/about">About</NavLink>
        </div>
    );
};
