import React, { useState } from 'react'
import { ListGroup, ListGroupItem, Button, Container, Row, Col, Modal, ModalBody, FormInput,FormTextarea    } from "shards-react";

export default function CContactList({event_id}) {


    const [contacts, setContacts] = useState([])
    
    return (
        <Container >
            <Row noGutters={ true } style={ { height: '70px', border: '1px solid rgba(0,0,0,.125)' } }>
                <h5 style={ { margin: "auto" } }>Contacts</h5>
            </Row>


            <ListGroup flush={false} >
                {contacts.map(contact => {
                    return(
                        <ListGroupItem squared theme='light' key = {contact.id}>
                            <div>{contact.name}</div>
                            <div>{contact.email}</div>
                            <div>{contact.phone}</div>
                             </ListGroupItem>
                    )
                })}
            </ListGroup>
        </Container>

    )
}