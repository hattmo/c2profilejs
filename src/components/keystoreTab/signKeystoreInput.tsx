import * as React from 'react';
import { Component, ChangeEvent } from 'react';
import { InputGroup, Form } from 'react-bootstrap';

interface Props {
    keystores: string[]
}


export default class signKeystoreInput extends Component<Props> {
    state = {
        isChecked: false
    }

    constructor(props) {
        super(props);
        this.onChecked = this.onChecked.bind(this);
    }
    onChecked(event: ChangeEvent<HTMLInputElement>): void {
        this.setState({
            isChecked: event.target.checked
        })
    }

    render() {
        return (
            <InputGroup className='mb-2'>
                <InputGroup.Prepend>
                    <InputGroup.Text>
                        Sign
                    </InputGroup.Text>
                    <InputGroup.Checkbox disabled={!this.props.keystores.length} onChange={this.onChecked} />
                </InputGroup.Prepend>
                <Form.Control disabled={!this.state.isChecked} as="select">
                    {this.props.keystores.map((val) => {
                        return (<option key={val}>{val}</option>)
                    })}
                </Form.Control>
            </InputGroup>
        )
    }
}
