import * as React from 'react';
import { Component } from 'react';
import { InputGroup, Form } from 'react-bootstrap';

interface Props {
    keystores: string[],
    isChecked: boolean,
    selectedVal: string,
    onSelected: (event: any) => void,
    onChecked: (event: any) => void
}


export default class signKeystoreInput extends Component<Props> {
    render() {
        return (
            <InputGroup className='mb-2'>
                <InputGroup.Prepend>
                    <InputGroup.Text>
                        Sign
                    </InputGroup.Text>
                    <InputGroup.Checkbox disabled={!this.props.keystores.length} onChange={this.props.onChecked} />
                </InputGroup.Prepend>
                <Form.Control  value={this.props.selectedVal} onChange={this.props.onSelected} disabled={!this.props.isChecked} as="select">
                    <option key={''} value={''}></option>
                    {this.props.keystores.map((val) => {
                        return (<option key={val} value={val}>{val}</option>)
                    })}
                </Form.Control>
            </InputGroup>
        )
    }
}
