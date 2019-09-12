import * as React from "react";
import * as ReactDom from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./components/main";
import "./style.css"
import InputSignKeystore from "./components/utility/InputSignKeystore";
import InputText from "./components/utility/InputText"
import InputSelectText from "./components/utility/InputSelectText";

const root = document.createElement("div");
root.id = "root";
document.body.appendChild(root);

ReactDom.render(
    <div>
        <Main />
    </div>,
    document.getElementById("root"),
);
