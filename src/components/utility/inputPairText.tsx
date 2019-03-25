import * as React from 'react'
import { Component } from 'react'
import { Container, InputGroup, FormControl, Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import Pill from './pill';
import { Option } from '../../interfaces/profile';

interface Props {
    path: string,
    label: string,
    formatKey: RegExp,
    formatValue: RegExp,
    selectedOptions: Option[],
    onChanged: (path: string, options: Option[]) => void
}

interface State {
    key: string
    value: string
}

export default class InputPairText extends Component<Props, State> {


    static defaultProps = {
        selectedOptions: [],
    }
    constructor(props: Readonly<Props>) {
        super(props)
        this.state = {
            key: '',
            value: ''
        }
        this.onAddClick = this.onAddClick.bind(this);
        this.onRemoveClicked = this.onRemoveClicked.bind(this);
        this.buildSelectedOptions = this.buildSelectedOptions.bind(this);
        this.validateKey = this.validateKey.bind(this);
        this.validateValue = this.validateValue.bind(this);

    }

    onAddClick(key: string, value: string) {
        if (value === "") return;
        let index = -1;
        var tempArr = this.props.selectedOptions.slice();
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
            this.setState({
                key: '',
                value: ''
            });
        } else {
            tempArr.push({
                key,
                value
            })
            this.props.onChanged(this.props.path, tempArr);
            this.setState({
                key: '',
                value: ''
            });
        }
    }

    onRemoveClicked(label: string) {
        var tempArr = this.props.selectedOptions.slice();
        let index = tempArr.map(val => val.key).indexOf(label);
        if (index !== -1) {
            tempArr.splice(index, 1)
        }
        tempArr = tempArr.length > 0 ? tempArr : undefined
        this.props.onChanged(this.props.path, tempArr);
    }

    onTyped(e: React.FormEvent<HTMLInputElement>, left: boolean): void {
        if (left) {
            this.setState({
                key: e.currentTarget.value
            })
        } else {
            this.setState({
                value: e.currentTarget.value
            })
        }

    }

    buildSelectedOptions(): JSX.Element[] {
        return (
            this.props.selectedOptions.map((val: Option) => {
                return (
                    <Pill key={val.key} onClick={() => this.onRemoveClicked(val.key)} id={val.key}>
                        {val.key} {val.value}
                    </Pill>)
            })

        )
    }

    validateKey(): string {
        if (this.state.key === '') {
            return '';
        } else {
            return this.props.formatKey.test(this.state.key) ? 'goodInput' : 'badInput';
        }
    }
    validateValue(): string {
        if (this.state.value === '') {
            return '';
        } else {
            return this.props.formatValue.test(this.state.value) ? 'goodInput' : 'badInput';
        }
    }

    render(): JSX.Element {
        return (
            <Container fluid className='my-1'>
                <Row>
                    {this.buildSelectedOptions()}
                </Row>
                <Row>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                {this.props.label}
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl className={this.validateKey()} onChange={(e) => { this.onTyped(e, true) }} value={this.state.key} />
                        <FormControl className={this.validateValue()} onChange={(e) => { this.onTyped(e, false) }} value={this.state.value} />
                        <InputGroup.Append>
                            <Button onClick={() => this.onAddClick(this.state.key, this.state.value)}>
                                Add
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Row>
            </Container>
        )
    }
}
