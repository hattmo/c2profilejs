import * as React from 'react'
import { Component } from 'react'
import { Container, InputGroup, Button } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';

export default class GlobalOptionForm extends Component {
    render() {
        return (
            <Container fluid>
                <InputGroup>
                    <InputGroup.Prepend>
                        <FormControl as='select'>
                            <option>one</option>
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
