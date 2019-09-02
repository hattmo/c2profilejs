import * as React from "react";
import { ChangeEvent, Component } from "react";
import { Form, InputGroup } from "react-bootstrap";

interface Props {
    path: string;
    label: string;
    selectedVal: string;
    keystoreNames: string[];
    onChanged: (path: string, text: string | undefined) => void;
}

interface State {
    isChecked: boolean;
}

export default class InputSignKeystore extends Component<Props, State> {

    public static defaultProps = {
        selectedVal: "",
    };

    constructor(props: Readonly<Props>) {

        super(props);
        this.state = {
            isChecked: false,
        };
        this.onChecked = this.onChecked.bind(this);
    }

    public onChecked(event: ChangeEvent<HTMLInputElement>): void {
        this.setState({
            isChecked: event.target.checked,
        });
        this.props.onChanged(this.props.path, undefined);
    }
    public onSelected(e): void {
        this.props.onChanged(this.props.path, e.currentTarget.value || undefined);
    }

    public render(): JSX.Element {
        return (
            <InputGroup className="my-1">
                <InputGroup.Prepend>
                    <InputGroup.Text>
                        {this.props.label}
                    </InputGroup.Text>
                    <InputGroup.Checkbox disabled={!this.props.keystoreNames.length} onChange={this.onChecked} />
                </InputGroup.Prepend>
                <Form.Control value={this.props.selectedVal} onChange={(e) => this.onSelected(e)} disabled={!this.state.isChecked} as="select">
                    <option key={""} value={""}></option>
                    {this.props.keystoreNames.map((val) => {
                        return (<option key={val} value={val}>{val}</option>);
                    })}
                </Form.Control>
            </InputGroup>
        );
    }
}
