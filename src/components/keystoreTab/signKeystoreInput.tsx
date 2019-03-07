import * as React from 'react';
import { Component } from 'react';
import { InputGroup, Form } from 'react-bootstrap';

interface Props {
    keystores: string[]
}


export default class signKeystoreInput extends Component<Props> {
    render() {
        return (
            <InputGroup className='mb-2'>
                <InputGroup.Prepend>
                    <InputGroup.Text>
                        Sign
                    </InputGroup.Text>
                    <InputGroup.Checkbox />
                </InputGroup.Prepend>
                <Form.Control as="select">
                    {this.props.keystores.map((val) => {
                        return (<option key={val}>{val}</option>)
                    })}
                </Form.Control>
            </InputGroup>
        )
    }
}
