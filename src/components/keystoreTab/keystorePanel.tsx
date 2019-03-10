import * as React from 'react'
import { Component } from 'react'
import { Card } from 'react-bootstrap';
interface Props {
    title: string,
    dname: string,
    ca?: string,
}
interface State {
    opened: boolean
}
export default class KeystorePanel extends Component<Props, State> {
    state = {
        opened: false
    }
    constructor(props: Props) {
        super(props);
        this.buildCardBody = this.buildCardBody.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(): void {
        this.setState((prevState) => ({
            opened: !prevState.opened
        }))
    }
    buildCardBody(): JSX.Element {
        if (this.state.opened) {
            return (
                <Card.Text>
                    dname: {this.props.dname}<br />
                    {this.props.ca ? 'Signed' : 'Self-Signed'}<br />
                    <a href={`/keystores/${this.props.title}?download=true`}>download</a>
                </Card.Text>
            )
        }
    }

    render() : JSX.Element {
        return (
            <Card className='mx-3'>
                <Card.Header onClick={this.handleClick}><h5 className='text-center' style={{ cursor: 'pointer' }}>{this.props.title}</h5></Card.Header>
                {this.buildCardBody()}
            </Card>
        )
    }
}
