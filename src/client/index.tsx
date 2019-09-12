import * as React from "react";
import * as ReactDom from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//import Main from "./components/main";
import "./style.css"
import InputMutation from "./components/utility/InputMutation";

const root = document.createElement("div");
root.id = "root";
document.body.appendChild(root);

ReactDom.render(
    <div>
        <InputMutation onChanged={console.log} path={"poo.ba"} terminationOptions={[{ format: /test/, hasInput: true, text: "one" }]} transformOptions={[{ format: /.*/, hasInput: true, text: "one" }]} />
    </div>,
    document.getElementById("root"),
);
