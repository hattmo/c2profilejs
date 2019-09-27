import React from "react";
import ReactDom from "react-dom";
import Main from "./components/Main";
import "./style.css";
//import InputSelectText from "./components/formElements/inputs/InputSelectText";

const root = document.createElement("div");
document.body.appendChild(root);

ReactDom.render(
    <Main/>,
    // <InputSelectText path="pooba"
    //     options={[{ format: /\.*/, text: "option1", hasInput: true }]}
    //     selectedOptions={[{ key: "option1", value: "blah" }]}
    //     onChanged={console.log} />,
    root,
);
