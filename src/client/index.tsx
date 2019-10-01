import React from "react";
import ReactDom from "react-dom";
import Main from "./components/Main";
import "./style.css";
import "../../assets/futura.ttf";
import "../../assets/favicon.png";

const root = document.createElement("div");
document.body.appendChild(root);

ReactDom.render(
    <Main />,
    root,
);
