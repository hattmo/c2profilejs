import * as React from "react";
import { Component } from "react";
import { Badge } from "react-bootstrap";

interface Props {
    onClick: (event: any, optionID: string) => void;
    id: any;
}

export default class Pill extends Component<Props> {

    public render(): JSX.Element {
        return (
            <Badge className="m-1" pill variant="primary" onClick={(e) => this.props.onClick(e, this.props.id)} >
                {this.props.children}<span style={{ cursor: "pointer" }}> X</span>
            </Badge>
        );
    }
}
