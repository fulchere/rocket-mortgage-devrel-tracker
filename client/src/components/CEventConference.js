import React, { useState } from 'react'
import {Container, Row, Col} from 'shards-react'
import DatePicker from "react-datepicker";

import CEventList from './CEventList'

export default function CEventConference() {
    const [startDate, setStartDate] = useState(new Date());

    return (
        <Container>
            <Row><Col><h2>Example Event</h2></Col></Row>
            <Row>
                <Col>
                    <Row>
                        <Container>
                        <Row><div>Example Facility</div></Row>
                        <Row><div>Example Address</div></Row>
                        <Row><div>Example City/State/Zip</div></Row> 
                        </Container>
                    </Row>
                    <Row>
                    <Container>
                        <Row><div>Example Contact</div></Row>
                        <Row><div>Example Email</div></Row>
                        <Row><div>Example Phone Number</div></Row> 
                        </Container>
                    </Row>
                    <Row>
                        <div>Example Description</div>
                    </Row>
                    <Row><div>Rating system goes here</div></Row>
                </Col>
                <Col>
                    <Row><DatePicker selected={startDate} onChange={date => setStartDate(date)} /></Row>
                    <Row>
                    <Container>
                        <Row><div>Example Start Time</div></Row>
                        <Row><div>Example End Time</div></Row>
                        </Container>
                    </Row>
                    <Row><div>miniature event list goes here</div></Row>
                </Col>

            </Row>
        </Container>
    )
}
