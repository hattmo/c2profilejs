import React from "react";
import { NavLink } from "react-router-dom";

interface IProps {
    className?: string;
}

export default ({ className }: IProps) => {
    return (
        <div className={`navbar ${className}`} >
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/keystore">Keystore</NavLink>
            <NavLink to="/about">About</NavLink>
        </ div>
    );
};
