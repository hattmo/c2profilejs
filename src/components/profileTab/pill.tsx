import * as React from 'react'
import { Component } from 'react'
import { Badge, Button } from 'react-bootstrap';

export default class Pill extends Component {
    render() {
        return (
            <Badge pill variant="primary" >
                Hello World <span style={{ cursor: 'pointer' }}>X</span>
            </Badge>
        )
    }
}
