import * as React from 'react'
import { Component } from 'react'
import { Container, InputGroup, FormControl, Button } from 'react-bootstrap';
import { OptionSelectText } from '../../interfaces/formInterfaces';
import { Row } from 'react-bootstrap';
import Pill from './pill';
import { Option } from '../../interfaces/profile';

interface Props {
    path: string,
    options: OptionSelectText[],
    selectedOptions: Option[],
    onChanged: (path: string, options: Option[]) => void
}

interface State {
    selectedKey: string
    value: string
}

export default class InputSelectText extends Component<Props, State> {

    constructor(props: Readonly<Props>) {
        super(props)
        this.state = {
            selectedKey: props.options[0].text,
            value: ''
        }
        this.onAddClick = this.onAddClick.bind(this);
        this.onRemoveClicked = this.onRemoveClicked.bind(this);
        this.buildOptions = this.buildOptions.bind(this);
        this.buildSelectedOptions = this.buildSelectedOptions.bind(this);
    }

    onAddClick(key: string, value: string) {
        if (value === "") return;
        let index = -1;
        let tempArr
        if (this.props.selectedOptions) {
            tempArr = this.props.selectedOptions.slice();
        } else {
            tempArr = []
        }
        if (tempArr.find((item: Option, i: number) => {
            if (item.key === key) {
                index = i;
                return true;
            } else {
                return false;
            }
        })) {
            tempArr[index].value = value;
            this.props.onChanged(this.props.path, tempArr);
            this.setState({ value: '' });
        } else {
            tempArr.push({
                key,
                value
            })
            this.props.onChanged(this.props.path, tempArr);
            this.setState({ value: '' });
        }
    }

    onRemoveClicked(optionID: string) {
        let index = -1;
        var tempArr = this.props.selectedOptions.slice();
        tempArr.find((item: Option, i: number) => {
            if (item.key === optionID) {
                index = i;
                return true;
            } else {
                return false;
            }
        })
        if (index !== -1) {
            tempArr.splice(index, 1)
        }
        this.props.onChanged(this.props.path, tempArr);
    }

    onSelected(e: React.FormEvent<HTMLInputElement>): void {
        this.setState({
            selectedKey: e.currentTarget.value
        })
    }

    onTyped(e: React.FormEvent<HTMLInputElement>): void {
        this.setState({
            value: e.currentTarget.value
        })
    }

    buildOptions(): JSX.Element[] {
        return this.props.options.map(val => {
            return (
                <option key={val.text}>
                    {val.text}
                </option>
            )
        })
    }

    buildSelectedOptions(): JSX.Element[] {
        if (!this.props.selectedOptions) return null
        return (
            this.props.selectedOptions.map((val: Option) => {
                return (
                    <Pill key={val.key} onClick={() => this.onRemoveClicked(val.key)} optionID={val.key}>
                        {val.key} {val.value}
                    </Pill>)
            })

        )
    }

    validateInput(): string {
        if (this.state.value === '') {
            return '';
        } else {
            return this.props.options.find(val => val.text === this.state.selectedKey).format.test(this.state.value) ? 'goodInput' : 'badInput';
        }
    }

    render(): JSX.Element {
        return (
            <Container fluid>
                <Row>
                    {this.buildSelectedOptions()}
                </Row>
                <Row>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <FormControl value={this.state.selectedKey} onChange={(e: any) => this.onSelected(e)} as='select' >
                                {this.buildOptions()}
                            </FormControl>
                        </InputGroup.Prepend>
                        <FormControl className={this.validateInput()} onChange={(e) => { this.onTyped(e) }} value={this.state.value} />
                        <InputGroup.Append>
                            <Button onClick={() => this.onAddClick(this.state.selectedKey, this.state.value)}>
                                Add
                        </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Row>
            </Container>
        )
    }
}
