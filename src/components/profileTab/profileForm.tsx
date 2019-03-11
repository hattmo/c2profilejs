import * as React from 'react'
import { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import cobaltStrikeProfile from '../../formDescription/profileDesc';
import CollapsablePanel from '../utility/collapsablePanel';


interface State {
    [x: string]: any
}
interface Prop {

}

export default class ProfileForm extends Component<Prop, State> {

    constructor(props) {
        super(props)
        this.updateData = this.updateData.bind(this)
    }

    updateData(path: string, data: any) {
        this.setState({
            [path]: data
        })
    }

    populateSection() {

    }

    buildSections(): JSX.Element[] {
        return cobaltStrikeProfile.sections.map((val) => {
            return (
                <Row key={val.title}>
                    <Col md='12'>
                        <CollapsablePanel title={val.title}>
                        </CollapsablePanel>
                    </Col>
                </Row>
            )
        })
    }

    render(): JSX.Element {
        return (
            <Container fluid>
                {this.buildSections()}
            </Container>
        )
    }
}
//<SelectText selectedOptions={this.state.selectedOptions} onChanged={this.updateData} options={cobaltStrikeProfile.sections[0].fields[0].options}></SelectText>