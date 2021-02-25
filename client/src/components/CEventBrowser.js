import React from 'react'

import {Container, Row, Col} from 'shards-react'

import CEventList from './CEventList'
import CEvent from './CEvent'

export default function CEventBrowser({type, event_data}) {
    return (
        <div style={{padding: "20px"}}>
        <Container fluid={true}>
            <Row noGutters={true}>
                <Col sm="12" md="4" lg="3">
            <CEventList type={type} event_data={event_data}/>
            </Col>
            <Col sm="12" md="4" lg="6">
            <CEvent type={type}/>
            </Col>
            </Row>
        </Container>
        </div>
    )
}
