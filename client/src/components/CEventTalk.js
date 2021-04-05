import React, { useState, useEffect } from 'react'
import { Container, Row, Col, ListGroup, ListGroupItem, Form, FormInput, FormGroup, Button, ModalBody, Nav, NavItem, NavLink, Modal } from 'shards-react'
import DatePicker from "react-datepicker";
import CAPIService from './CAPIService'
import { useAuth } from '../contexts/AuthContext'


export default function CEventTalk({ event_id }) {
    const { currentUser } = useAuth()
    const [startDate, setStartDate] = useState(new Date());
    const [talk, setTalk] = useState({});
    const [event, setEvent] = useState([]);
    const [open, setOpen] = useState(false)
    const [newActive, setNewActive] = useState(true);
    const [eventId, setEventid] = useState('');

    useEffect(() => {
        CAPIService.getTalkByID(event_id)
            .then(res => {
                console.log(res);
                setTalk(res);
            })
        // CAPIService.getEvent(event_id)
        //     .then(res => {
        //         console.log(res);
        //         setEvent(res);
        //     })
    }, [event_id])
    useEffect(() => {
        CAPIService.getAllUserEvents(currentUser.email)
            .then(res => {
                console.log(res);
                setEvent(res['event_pairs']);
            })
    }, [])
    const add = () => {
        CAPIService.addTalkToEventByEventId({ event_id: event_id, talk_id: eventId })
            .then(res => {
                console.log(res);
                setOpen(false);
            })

    }
    return (
        <Container>
            <Row><Col><h2 style={ { textAlign: 'center' } }>{talk.title}</h2></Col></Row>
            <Row>
                <Col>
                    <Row>
                        <Container>
                            <Row>
                                <div style={ {
                                    border: '1px solid rgba(0,0,0,.125)',
                                    width: '80%', height: 300, padding: 15
                                } }>{ talk.description }</div>
                            </Row>
                        </Container>
                    </Row>
                </Col>
                <Col>
                    <Row>
                        <Container>
                            <div style={ { display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '15px 0', border: '1px solid rgba(0,0,0,.125)' } }>
                                <h5>Example Talk given at</h5>
                                <Button onClick={ () => setOpen(!open) } outline size='sm' theme="light" href="">+</Button>
                            </div>
                            <ListGroup>
                                {
                                    talk['event_ids']?.map(id => (
                                        <Button squared theme='light' outline style={ { display: 'flex', justifyContent: 'space-around' } }><span>{ id }</span></Button>
                                    ))
                                }
                            </ListGroup>
                        </Container>
                    </Row>
                </Col>

            </Row>
            <Modal open={ open } toggle={ () => setOpen(!open) } >
                <ModalBody>

                    <h4 style={ { paddingTop: '20px', textAlign: 'center' } }>Add a Event</h4>
                    <ListGroup style={ { width: '60%', margin: '10px auto' } }>
                        {
                            event.map(ev => (
                                <Button onClick={ () => setEventid(ev.id) } squared theme='light' outline={ eventId != ev.id } style={ { display: 'flex', justifyContent: 'space-around' } }>{ ev.event_name }</Button>
                            ))
                        }
                    </ListGroup>
                    <div style={ { textAlign: 'center' } }>
                        <Button onClick={ () => add() } > Add </Button>

                    </div>
                </ModalBody>

            </Modal>
        </Container>
    )
}
