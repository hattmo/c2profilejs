import * as React from 'react'
import { Component } from 'react'
import { Mutation } from '../../interfaces/profile';
import { Container, InputGroup, FormControl, Button, ListGroup } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { OptionSelectText } from '../../interfaces/formInterfaces';
import Pill from './pill';


interface Props {
    path: string
    transformOptions: OptionSelectText[],
    terminationOptions: OptionSelectText[],
    currentMutation: Mutation
    onChanged: (path: string, mutation: Mutation) => void
}
interface State {
    selectedTransformKey: string,
    transformValue: string,
}

export default class InputMutation extends Component<Props, State> {
    static defaultProps = {
        currentMutation: {
            transform: [],
            termination: {
                key: '',
                value: ''
            }
        }
    }
    constructor(props: Readonly<Props>) {
        super(props)
        this.state = {
            selectedTransformKey: props.transformOptions[0].text,
            transformValue: '',
        }
        this.onAddClick = this.onAddClick.bind(this)
        this.onRemoveClicked = this.onRemoveClicked.bind(this)
    }

    onAddClick() {
        let key = this.state.selectedTransformKey;
        let value = this.state.transformValue
        let tempArr = this.props.currentMutation.transform.slice();
        tempArr.push({
            key,
            value
        });
        let newMutation: Mutation = {
            transform: tempArr,
            termination: this.props.currentMutation.termination
        }
        this.props.onChanged(this.props.path, newMutation);
    }

    onTransformSelected(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            selectedTransformKey: e.currentTarget.value,
            transformValue: ''
        })
    }
    onTerminationSelected(e: React.FormEvent<HTMLInputElement>) {
        if (e.currentTarget.value === '') {
            this.props.onChanged(this.props.path, undefined)
        } else {
            this.props.onChanged(this.props.path, {
                transform: this.props.currentMutation.transform,
                termination: {
                    key: e.currentTarget.value,
                    value: ''
                }
            })
        }
    }

    onTransformTyped(e: React.FormEvent<HTMLInputElement>): void {
        this.setState({
            transformValue: e.currentTarget.value
        })
    }
    onTerminationTyped(e: React.FormEvent<HTMLInputElement>): void {

        this.props.onChanged(this.props.path, {
            transform: this.props.currentMutation.transform,
            termination: {
                key: this.props.currentMutation.termination.key,
                value: e.currentTarget.value
            }
        })
    }

    validateTransformInput(): string {
        if (this.state.transformValue === '') {
            return '';
        } else {
            return this.props.transformOptions.find(val => val.text === this.state.selectedTransformKey).format.test(this.state.transformValue) ? 'goodInput' : 'badInput';
        }
    }
    validateTerminationInput(): string {
        if (this.props.currentMutation.termination.value === '') {
            return '';
        } else {
            return this.props.terminationOptions.find(val => val.text === this.props.currentMutation.termination.key).format.test(this.props.currentMutation.termination.value) ? 'goodInput' : 'badInput';
        }
    }

    transformHasInput(): boolean {
        return !this.props.transformOptions.find(val => val.text === this.state.selectedTransformKey).hasInput
    }

    terminationHasInput(): boolean {
        return !this.props.terminationOptions.find(val => val.text === this.props.currentMutation.termination.key).hasInput
    }

    buildTransformOptions(): JSX.Element[] {
        return this.props.transformOptions.map(val => {
            return (
                <option key={val.text}>
                    {val.text}
                </option>
            )
        })
    }
    buildTerminationOptions(): JSX.Element[] {
        return this.props.terminationOptions.map(val => {
            return (
                <option key={val.text}>
                    {val.text}
                </option>
            )
        })
    }
    onRemoveClicked(index: number) {
        var tempArr = this.props.currentMutation.transform.slice()
        tempArr.splice(index, 1)
        if (tempArr.length === 0 && this.props.currentMutation.termination.key === "") {
            this.props.onChanged(this.props.path, undefined)
        } else {
            this.props.onChanged(this.props.path, {
                termination: this.props.currentMutation.termination,
                transform: tempArr
            })
        }
    }
    buildSelectedTransformOptions(): JSX.Element[] {
        return this.props.currentMutation.transform.map((val, index) => {
            return (
                <Row key={index}>
                    <Pill id={index} onClick={this.onRemoveClicked}>{`${index + 1} ${val.key} ${val.value}`}</Pill>
                </Row>
            )
        })
    }

    render(): JSX.Element {
        return (
            <Container fluid>
                <Row>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <FormControl className={'selectTextDropDown'}
                                value={this.state.selectedTransformKey}
                                onChange={(e: any) => this.onTransformSelected(e)}
                                as='select' >
                                {this.buildTransformOptions()}
                            </FormControl>
                        </InputGroup.Prepend>
                        <FormControl disabled={this.transformHasInput()} className={this.validateTransformInput()}
                            onChange={(e) => { this.onTransformTyped(e) }}
                            value={this.state.transformValue} />
                        <InputGroup.Append>
                            <Button onClick={this.onAddClick}>
                                Add
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Row>
                {this.buildSelectedTransformOptions()}
                <Row>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <FormControl className={'selectTextDropDown'}
                                value={this.props.currentMutation.termination.key}
                                onChange={(e: any) => this.onTerminationSelected(e)}
                                as='select' >
                                {this.buildTerminationOptions()}
                            </FormControl>
                        </InputGroup.Prepend>
                        <FormControl disabled={this.terminationHasInput()} className={this.validateTerminationInput()}
                            onChange={(e) => { this.onTerminationTyped(e) }}
                            value={this.props.currentMutation.termination.value} />
                    </InputGroup>
                </Row>
            </Container>
        )
    }
}
