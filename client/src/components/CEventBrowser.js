import React from 'react'

import {Container, Row, Col} from 'shards-react'


import CEventList from './CEventList'
import CEvent from './CEvent'

export default function CEventBrowser({type}) {
    return (
        <Container fluid={true}>
            <Row noGutters={true}>
                <Col>
            <CEventList type={type}/>
            </Col>
            <Col>
            <CEvent type={type}/>
            </Col>
            </Row>
        </Container>
    )
}
