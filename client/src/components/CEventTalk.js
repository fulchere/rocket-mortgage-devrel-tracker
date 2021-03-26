import React, { useState,useEffect } from 'react'
import { Container, Row, Col, ListGroup, ListGroupItem, Button } from 'shards-react'
import DatePicker from "react-datepicker";
import CAPIService from './CAPIService'

export default function CEventTalk({ event_id }) {
    const [startDate, setStartDate] = useState(new Date());
    const [talk, setTalk] = useState({});

    useEffect(() => {
        CAPIService.getTalkByID(event_id)
          .then(res => {
              console.log(res);
                setTalk(res);
          })        
      }, [event_id])

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
                                } }>{talk.description}</div>
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
                                <ListGroupItem style={ { display: 'flex', justifyContent: 'space-around' } }><span>MSU Engineering Conference</span> <span>given_status: {talk['given_status']}</span></ListGroupItem>
                            </ListGroup>
                        </Container>
                    </Row>
                </Col>

            </Row>

        </Container>
    )
}
