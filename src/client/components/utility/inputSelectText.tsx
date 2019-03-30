import * as React from "react";
import { Component } from "react";
import { Button, Container, FormControl, InputGroup } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { OptionSelectText } from "../../interfaces/formInterfaces";
import { Option } from "../../interfaces/profile";
import Pill from "./pill";

interface Props {
    path: string;
    options: OptionSelectText[];
    selectedOptions: Option[];
    onChanged: (path: string, options: Option[]) => void;
}

interface State {
    selectedKey: string;
    value: string;
}

export default class InputSelectText extends Component<Props, State> {

    public static defaultProps = {
        selectedOptions: [],
    };
    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            selectedKey: props.options[0].text,
            value: "",
        };
        this.onAddClick = this.onAddClick.bind(this);
        this.onRemoveClicked = this.onRemoveClicked.bind(this);
        this.buildOptions = this.buildOptions.bind(this);
        this.buildSelectedOptions = this.buildSelectedOptions.bind(this);
    }

    public onAddClick() {
        const key = this.state.selectedKey;
        const value =  this.state.value;
        if (!value) { return; }
        const tempArr = this.props.selectedOptions.slice();
        const index = tempArr.map((val) => val.key).indexOf(key);
        if (index >= 0) {
            tempArr[index].value = value;
            this.props.onChanged(this.props.path, tempArr);
            this.setState({ value: "" });
        } else {
            tempArr.push({
                key,
                value,
            });
            this.props.onChanged(this.props.path, tempArr);
            this.setState({ value: "" });
        }
    }

    public onRemoveClicked(label: string) {
        let tempArr = this.props.selectedOptions.slice();
        const index = tempArr.map((val) => val.key).indexOf(label);
        if (index !== -1) {
            tempArr.splice(index, 1);
        }
        tempArr = tempArr.length > 0 ? tempArr : undefined;
        this.props.onChanged(this.props.path, tempArr);
    }

    public onSelected(e: React.FormEvent<HTMLInputElement>): void {
        this.setState({
            selectedKey: e.currentTarget.value,
        });
    }

    public onTyped(e: React.FormEvent<HTMLInputElement>): void {
        this.setState({
            value: e.currentTarget.value,
        });
    }

    public buildOptions(): JSX.Element[] {
        return this.props.options.map((val) => {
            return (
                <option key={val.text}>
                    {val.text}
                </option>
            );
        });
    }

    public buildSelectedOptions(): JSX.Element[] {
        if (!this.props.selectedOptions) { return null; }
        return (
            this.props.selectedOptions.map((val: Option) => {
                return (
                    <Pill key={val.key} onClick={() => this.onRemoveClicked(val.key)} id={val.key}>
                        {val.key} {val.value}
                    </Pill>);
            })

        );
    }

    public validateInput(): string {
        if (this.state.value === "") {
            return "";
        } else {
            return this.props.options.find((val) => val.text === this.state.selectedKey).format.test(this.state.value) ? "goodInput" : "badInput";
        }
    }

    public render(): JSX.Element {
        return (
            <Container fluid className="my-1">
                <Row>
                    {this.buildSelectedOptions()}
                </Row>
                <Row>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <FormControl className={"selectTextDropDown"} value={this.state.selectedKey} onChange={(e: any) => this.onSelected(e)} as="select" >
                                {this.buildOptions()}
                            </FormControl>
                        </InputGroup.Prepend>
                        <FormControl className={this.validateInput()} onChange={(e) => { this.onTyped(e); }} value={this.state.value} />
                        <InputGroup.Append>
                            <Button onClick={this.onAddClick}>
                                Add
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Row>
            </Container>
        );
    }
}
