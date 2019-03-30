import * as React from "react";
import { Component } from "react";
import { Card } from "react-bootstrap";
interface Props {
    title: string;
}

export default class ProfileData extends Component<Props> {
    public render(): JSX.Element {
        return (
            <Card.Text>
                <a href={`/profiles/${this.props.title}?download=true`}>download</a>
            </Card.Text>
        );
    }
}
