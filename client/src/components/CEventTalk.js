import React, { useState } from 'react'
import {Container, Row, Col, ListGroup, ListGroupItem,} from 'shards-react'
import DatePicker from "react-datepicker";

export default function CEventTalk() {
    const [startDate, setStartDate] = useState(new Date());

    return (
        <Container>
            <Row><Col><h2>Example Talk</h2></Col></Row>
            <Row>
                <Col>
                    <Row>
                        <Container>
                        <Row>
                        <div>Example Description</div>
                        </Row>
                        </Container>
                    </Row>
                </Col>
                <Col>
                <Row>Example Talk given at</Row>
                    <Row>
                    <Container>
                        <ListGroup>
                        <ListGroupItem>Example Event 1</ListGroupItem>
                        <ListGroupItem>Example Event 2</ListGroupItem>
                        <ListGroupItem>Example Event 3</ListGroupItem>
                        <ListGroupItem>Example Event 4</ListGroupItem>
                        </ListGroup>
                        </Container>
                    </Row>
                </Col>

            </Row>
        </Container>
    )
}
