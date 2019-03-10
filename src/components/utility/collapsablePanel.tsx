import * as React from 'react'
import { Component } from 'react'
import { Card } from 'react-bootstrap';
interface Props {
    title: string,
}
interface State {
    closed: boolean
}
export default class CollapsablePanel extends Component<Props, State> {
    state = {
        closed: true
    }
    constructor(props: Readonly<Props>) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(): void {
        this.setState((prevState) => ({
            closed: !prevState.closed
        }))
    }

    render() : JSX.Element{
        return (
            <Card className='m-3'>
                <Card.Header onClick={this.handleClick}><h5 className='text-center' style={{ cursor: 'pointer' }}>{this.props.title}</h5></Card.Header>
                <Card.Body hidden={this.state.closed}>
                    {this.props.children}
                </Card.Body>
            </Card>
        )
    }
}
