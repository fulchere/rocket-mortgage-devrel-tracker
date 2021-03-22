import React, { useState } from 'react'
import { ListGroup, ListGroupItem, Button, Container, Row, Col, Modal, ModalBody, FormInput,FormTextarea    } from "shards-react";

import CAddConference from './CAddConference'
import CAddMedia from './CAddMedia';
import CAddTalks from './CAddTalk'

export default function CAddConferenceExistingList({ event_data, select_Event }) {


    const [selectedEvent, setSelectedEvent] = useState('')

    const selectEvent = (event) => {
        setSelectedEvent(event)
        select_Event(event)
    }
    const isSelected = (event) => {
        if (event === selectedEvent) { return (true) }
        else { return (false) }
    }
    
    return (
        <Container >
            <Row noGutters={ true } style={ { height: '70px', border: '1px solid rgba(0,0,0,.125)' } }>
            <h4 style={{margin: 'auto'}}>Existing Conference</h4>
            </Row>


            <ListGroup flush={false} >
                {event_data.map(event => {
                    return(
                        isSelected(event) ? 
                        <Button squared theme='light' key = {event.id}> {event.name}</Button> 
                        : 
                        <Button squared outline theme='light' 
                        key = {event.id} onClick={() => {selectEvent(event)}}> {event.name}</Button>
                    )
                })}
            </ListGroup>
        </Container>

    )
}