import * as React from 'react'
import { Component } from 'react'
import { Container, InputGroup, FormControl, Button } from 'react-bootstrap';
import { SelectTextOption } from '../../interfaces/profileInterfaces';
interface Props {
    options: SelectTextOption[]
}
export default class SelectText extends Component<Props> {

    constructor(props: Readonly<Props>) {
        super(props)
        this.buildOptions = this.buildOptions.bind(this);
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

    render(): JSX.Element {
        return (
            <Container fluid>
                <InputGroup>
                    <InputGroup.Prepend>
                        <FormControl as='select'>
                            {this.buildOptions()}
                        </FormControl>
                    </InputGroup.Prepend>
                    <FormControl />
                    <InputGroup.Append>
                        <Button>
                            Add
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </Container>
        )
    }
}
