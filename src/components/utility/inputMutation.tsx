import * as React from 'react'
import { Component } from 'react'
import { Mutation } from '../../interfaces/profile';
import { Container, InputGroup, FormControl, Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { OptionSelectText } from '../../interfaces/formInterfaces';


interface Props {
    transformOptions: OptionSelectText[],
    terminationOptions: OptionSelectText[],
    currentMutation: Mutation
}
interface State {
    selectedTransformKey: string,
    selectedTerminationKey: string,
    transformValue: string,
    terminationValue: string
}

export default class InputMutation extends Component<Props, State> {
    static defaultProps = {
        currentMutation: {
            transform: [],
            termination: ''
        }
    }
    constructor(props: Readonly<Props>) {
        super(props)
    }

    buildTransformOptions(): JSX.Element[]{
        return this.props.transformOptions.map(val => {
            return (
                <option key={val.text}>
                    {val.text}
                </option>
            )
        })
    }

    validateTransformInput(): string {
        if (this.state.transformValue === '') {
            return '';
        } else {
            return this.props.transformOptions.find(val => val.text === this.state.selectedTransformKey).format.test(this.state.transformValue) ? 'goodInput' : 'badInput';
        }
    }

    render(): JSX.Element {
        return (
            <Container fluid>
                <Row>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <FormControl className={'selectTextDropDown'} value={this.state.selectedtransformKey} onChange={(e: any) => this.onSelected(e)} as='select' >
                                {this.buildTransformOptions()}
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
