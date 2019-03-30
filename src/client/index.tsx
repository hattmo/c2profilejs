import * as React from "react";
import * as ReactDom from "react-dom";
// tslint:disable: no-var-requires
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/selectTextStyle.css";

import Main from "./components/main";

const root = document.createElement("div");
root.id = "root";
document.body.appendChild(root);

ReactDom.render(
    <Main />,
    document.getElementById("root"),
);
