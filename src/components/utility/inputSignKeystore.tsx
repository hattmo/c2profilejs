import * as React from 'react';
import { Component, ChangeEvent } from 'react';
import { InputGroup, Form } from 'react-bootstrap';

interface Props {
    path: string,
    label: string,
    selectedVal: string,
    keystoreNames: string[],
    onChanged: (path: string, text: string) => void
}

interface State {
    isChecked: boolean,
}



export default class InputSignKeystore extends Component<Props, State> {

    static defaultProps = {
        selectedVal: ''
    }

    constructor(props) {

        super(props)
        this.state = {
            isChecked: false,
        }
        this.onChecked = this.onChecked.bind(this)
    }

    onChecked(event: ChangeEvent<HTMLInputElement>): void {
        this.setState({
            isChecked: event.target.checked,
        })
        this.props.onChanged(this.props.path, undefined)
    }
    onSelected(e: React.FormEvent<HTMLInputElement>): void {
        this.props.onChanged(this.props.path, e.currentTarget.value || undefined)
    }

    render(): JSX.Element {
        return (
            <InputGroup className='my-1'>
                <InputGroup.Prepend>
                    <InputGroup.Text>
                        {this.props.label}
                    </InputGroup.Text>
                    <InputGroup.Checkbox disabled={!this.props.keystoreNames.length} onChange={this.onChecked} />
                </InputGroup.Prepend>
                <Form.Control value={this.props.selectedVal} onChange={(e) => this.onSelected(e)} disabled={!this.state.isChecked} as="select">
                    <option key={''} value={''}></option>
                    {this.props.keystoreNames.map((val) => {
                        return (<option key={val} value={val}>{val}</option>)
                    })}
                </Form.Control>
            </InputGroup>
        )
    }
}
