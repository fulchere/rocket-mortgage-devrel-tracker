import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import {Container, Row, Col} from 'shards-react'


export default function CEventMedia() {
    const [value, onChange] = useState(new Date());
    return (
        <Container>
            <Row><Col><h2>Example Podcast</h2></Col></Row>

            <Row>
                <Col sm="12" md="4" lg="3">
                    Example Decription of the media
                </Col>

                <Col>
                    <DatePicker
                        onChange={onChange}
                        value={value}
                        />
                </Col>
            </Row>

            <Row><Col>Type: Podcast</Col>></Row>

        </Container>
    )
}
