import React, { useState } from 'react'
import { ListGroup, ListGroupItem, Button, Container, Row, Col, Modal, ModalBody, FormInput,FormTextarea    } from "shards-react";

import CAddConference from './CAddConference'
import CAddMedia from './CAddMedia';
import CAddTalks from './CAddTalk'

export default function CHomepageFeed({event_data}) {

    
    return (
        <Container >
            <Row noGutters={ true } style={ { height: '70px', border: '1px solid rgba(0,0,0,.125)' } }>
                <h5 style={ { margin: "auto" } }>Upcoming Events</h5>
                <div style={ { margin: "auto" } }>
                </div>
            </Row>


            <ListGroup flush={false} >
                {event_data.map(event => {
                    return(

                        <ListGroupItem squared theme='light' key = {event.id}> {event.name}</ListGroupItem> 
                        
                    )
                })}
            </ListGroup>
        </Container>

    )
}
