import React, { useState, useEffect } from 'react'

import { Container, Row, Col } from 'shards-react'

import CEventList from './CEventList'
import CEvent from './CEvent'

export default function CEventBrowser({ type, event_data }) {
    const [selectedEvent, setSelectedEvent] = useState()
    const [isSelected, setIsSelected] = useState(false)

    const select_Event = (event) => {
        console.log(event)
        setSelectedEvent(event.id)
        setIsSelected(true)
        
    }
    



    return (
        <div style={ { padding: "20px" } }>
            <Container fluid={ true }>
                <Row noGutters={ true }>
                    <Col sm="12" md="4" lg="4">
                        <CEventList type={ type } event_data={ event_data } select_Event={select_Event}/>
                    </Col>
                    <Col sm="12" md="8" lg="8">
                        {isSelected ? <CEvent type={ type } event_id={selectedEvent} /> : <div></div> }
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
