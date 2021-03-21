import React, { useState } from 'react'
import { Container, Row, Col, ListGroup, ListGroupItem, Button } from 'shards-react'
import DatePicker from "react-datepicker";

export default function CEventTalk({ event_id }) {
    const [startDate, setStartDate] = useState(new Date());

    return (
        <Container>
            <Row><Col><h2 style={ { textAlign: 'center' } }>Coding in React</h2></Col></Row>
            <Row>
                <Col>
                    <Row>
                        <Container>
                            <Row>
                                <div style={ { 
                                    border: '1px solid rgba(0,0,0,.125)', 
                                    width: '80%', height: 300, padding: 15 
                                } }>{event_id}Brief overview on how to start learning the react.js framework.</div>
                            </Row>
                        </Container>
                    </Row>
                </Col>
                <Col>
                    <Row>
                        <Container>
                            <div style={ { display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '15px 0', border: '1px solid rgba(0,0,0,.125)' } }>
                                <h5>Example Talk given at</h5>
                                <Button outline size='sm' theme="light" href="">+</Button>
                            </div>
                            <ListGroup>
                                <ListGroupItem style={ { display: 'flex', justifyContent: 'space-around' } }><span>MSU Engineering Conference</span> <span>status: Given</span></ListGroupItem>
                            </ListGroup>
                        </Container>
                    </Row>
                </Col>

            </Row>

        </Container>
    )
}
