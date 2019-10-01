import React from "react";

interface IProps {
    navLinks: React.ReactNode[];
}

export default ({ navLinks }: IProps) => {
    return (
        <div style={mainStyle}>
            {navLinks}
        </ div>
    );
};

const mainStyle: React.CSSProperties = {
    backgroundColor: "rgba(100, 100, 255, 0.5)",
    position: "fixed",
    width: "100vw",
    left: "0px",
    top: "0px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, 120px)",
    gridTemplateRows: "60px",
    justifyContent: "center",
    placeItems: "stretch stretch",
    borderBottomWidth: "2px",
    borderStyle: "solid",
    padding: "4px",
    gap: "4px",
};
