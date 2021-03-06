import React, { useState } from 'react'
import { ListGroup, ListGroupItem, Button, Container, Row, Col, Modal, ModalBody, FormInput,FormTextarea    } from "shards-react";

import CAddConference from './CAddConference'
import CAddTalks from './CAddTalk'

export default function CEventList({ type, event_data }) {
    console.log(event_data)
    console.log(type)


    const [selectedEvent, setSelectedEvent] = useState('')
    const [open,setOpen] = useState(false)

    const selectEvent = (event) => {
        setSelectedEvent(event)

        //more logic will be added here
    }

    const isSelected = (event) => {
        if (event === selectedEvent) { return (true) }
        else { return (false) }
    }

    const addEvent = () => {
        setOpen(!open)

    }


    return (
        <Container >
            <Row noGutters={ true } style={ { height: '70px', border: '1px solid rgba(0,0,0,.125)' } }>
                <h5 style={ { margin: "auto" } }>Your { type }s</h5>
                <div style={ { margin: "auto" } }>
                    <Button outline size='sm' theme="light" onClick={ addEvent } href="">+</Button>
                </div>
            </Row>


            <ListGroup flush={false} >
                {event_data.map(event => {
                    return(
                        isSelected(event) ? <Button squared theme='light' key = {event}> {event}</Button> : <Button squared outline theme='light' key = {event} onClick={() => {selectEvent(event)}}> {event}</Button>
                    )
                })}
            </ListGroup>
            <Modal open={ open } toggle={ ()=>setOpen(!open)} >
                {
                    type=='Talk'?<CAddTalks />:<CAddConference />
                }
                
            </Modal>
        </Container>

    )
}
