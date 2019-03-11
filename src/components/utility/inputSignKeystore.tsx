import * as React from 'react';
import { Component, ChangeEvent } from 'react';
import { InputGroup, Form } from 'react-bootstrap';

interface Props {
    path: string,
    label: string,
    selectedVal: string,
    keystores: string[],
    onChanged: (path: string, text: string) => void
}

interface State {
    isChecked: boolean,
}



export default class InputSignKeystore extends Component<Props, State> {

    constructor(props) {
        super(props)
        this.state = {
            isChecked: false,
        }
    }

    onChecked(event: ChangeEvent<HTMLInputElement>): void {
        this.setState({
            isChecked: event.target.checked,
        })
        this.props.onChanged(this.props.path, undefined)
    }
    onSelected(e: React.FormEvent<HTMLInputElement>): void {
        this.props.onChanged(this.props.path, e.currentTarget.value)
    }

    render(): JSX.Element {
        return (
            <InputGroup className='mb-2'>
                <InputGroup.Prepend>
                    <InputGroup.Text>
                        {this.props.label}
                    </InputGroup.Text>
                    <InputGroup.Checkbox disabled={!this.props.keystores.length} onChange={this.onChecked} />
                </InputGroup.Prepend>
                <Form.Control value={this.props.selectedVal} onChange={(e) => this.onSelected} disabled={!this.state.isChecked} as="select">
                    <option key={''} value={''}></option>
                    {this.props.keystores.map((val) => {
                        return (<option key={val} value={val}>{val}</option>)
                    })}
                </Form.Control>
            </InputGroup>
        )
    }
}
