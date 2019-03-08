import * as React from 'react'
import { Component } from 'react'
import { Card } from 'react-bootstrap';
interface Props {
    title: string,
    dname: string,
    ca?: string,
}

export default class KeystoreData extends Component<Props> {

    render(): JSX.Element {
        return (
            <Card.Text>
                dname: {this.props.dname}<br />
                {this.props.ca ? 'Signed' : 'Self-Signed'}<br />
                <a href={`/keystores/${this.props.title}?download=true`}>download</a>
            </Card.Text>
        )
    }

}
