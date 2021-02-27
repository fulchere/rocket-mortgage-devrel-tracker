import React, { useState } from 'react'
import { ListGroup, ListGroupItem, Button, Container, Row, Col, Modal, ModalBody, FormInput,FormTextarea    } from "shards-react";
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


            <ListGroup flush={ false } >
                {
                    event_data.map(event => <ListGroupItem>{ event }</ListGroupItem>)
                }
            </ListGroup>
            <Modal open={ open } toggle={ ()=>setOpen(!open)} style={{width:'1000px'}}>
                <ModalBody>
                    <h3 className='title'>Add a conference</h3>
                    <FormInput  placeholder="MSU Engineering"/>
                    <Row>
                        <Col>
                            <h4 className='title'>Location Info</h4>
                            <FormInput  placeholder="MSU Engineering"/>
                            <FormInput  placeholder="MSU Engineering"/>
                            <FormInput  placeholder="MSU Engineering"/>
                            <h4 className='title'>Contact Info</h4>
                            <FormInput  placeholder="MSU Engineering"/>
                            <FormInput  placeholder="MSU Engineering"/>
                            <FormInput  placeholder="MSU Engineering"/>
                        </Col>
                        <Col>
                            <h4 className='title'>Time</h4>
                            <FormInput  placeholder="MSU Engineering"/>
                            <FormInput  placeholder="MSU Engineering"/>
                            <h4 className='title'>
                                Description
                                <input type="date" style={{width:160,marginLeft:30,border: '1px solid rgba(0,0,0,.125)'}}/>
                            </h4>
                            <FormTextarea value='conference for MSU enggering'/>
                        </Col>
                    </Row>
                    <div className='title'>
                        <Button>Submit</Button>
                    </div>
                </ModalBody>
            </Modal>
        </Container>

    )
}
