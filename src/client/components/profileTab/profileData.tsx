import * as React from "react";
import { Card } from "react-bootstrap";
interface Props {
    title: string;
}

export default function({title}: Props): JSX.Element {
    return (
        <Card.Text>
            <a href={`/profiles/${title}?download=true`}>download</a>
        </Card.Text>
    );
}
