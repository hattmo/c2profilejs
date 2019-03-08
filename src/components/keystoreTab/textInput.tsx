import * as React from 'react';
import { Component } from 'react';
import { InputGroup, FormControl, } from 'react-bootstrap';

interface Props {
    text: string,
    id: string,
    onInput: (event: any, id: string) => any
}
export default class TextInput extends Component<Props> {

    constructor(props: Props) {
        super(props);

    }
    render() {
        return (
            <InputGroup className='mb-2'>
                <InputGroup.Prepend>
                    <InputGroup.Text>
                        {this.props.text}
                    </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl type='text' onChange={(e => this.props.onInput(e, this.props.id))} />
            </InputGroup>
        )
    }
}
