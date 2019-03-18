import * as React from 'react'
import { Component } from 'react'
import { Card } from 'react-bootstrap';
import { Option } from '../../interfaces/keystore';
interface Props {
    title: string,
    dname: Option[],
    ca?: string,
}

export default class KeystoreData extends Component<Props> {
    buildOptDName(dname: Option[]) {
        let out = '';
        dname.forEach((val) => {
            out += `${val.key}=${val.value}, `;
        });
        return out.slice(0, out.length - 2);
    }

    render(): JSX.Element {
        return (
            <Card.Text>
                dname: {this.buildOptDName(this.props.dname)}<br />
                {this.props.ca ? 'Signed' : 'Self-Signed'}<br />
                <a href={`/keystores/${this.props.title}?download=true`}>download</a>
            </Card.Text>
        )
    }
}
