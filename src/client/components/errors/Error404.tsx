import React from "react";
import { Link } from "react-router-dom";

export default ({}) => {
    return (
        <div style={mainStyle}>
            <p style={{ fontSize: "60pt", margin: "4px" }}>Error</p>
            <p style={{ fontSize: "40pt", margin: "4px" }}>Page Not Found</p>
            <p style={{ fontSize: "15pt", margin: "4px" }}>Return to the <Link to="/profile">Home</Link> Page?</p>
        </div >
    );
};

const mainStyle: React.CSSProperties = {
    position: "fixed",
    display: "grid",
    width: "100vw",
    height: "100vh",
    placeItems: "center center",
    placeContent: "center center",
    gridTemplateRows: "min-content min-content min-content",
};
