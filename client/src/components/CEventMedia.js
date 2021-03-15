import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import {Container, Row, Col} from 'shards-react'


export default function CEventMedia() {
    const [value, onChange] = useState(new Date());
    return (
        <Container>
            <Row><Col><h2>Example Podcast</h2></Col></Row>
            <Row>
                <Col sm="12" md="12" lg="6">
                    <div style={ { border: '1px solid rgba(0,0,0,.125)', width: '80%', height: 300, padding: 15 } }>
                        Example Decription of the media goes here
                    </div>
                </Col>

                <Col sm="12" md="12" lg="6">
                    <DatePicker
                        onChange={onChange}
                        value={value}
                    />
                    <div>
                    Type: Podcast
                    </div>
                </Col>
            </Row>

        </Container>
    )
}
