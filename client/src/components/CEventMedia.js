import React, { useState,useEffect } from 'react';
import DatePicker from 'react-date-picker';
import {Container, Row, Col} from 'shards-react'
import CAPIService from './CAPIService'


export default function CEventMedia({event_id}) {
    const [value, onChange] = useState(new Date());
    const [media, setMedia] = useState(new Date());
    useEffect(() => {
        CAPIService.getMediaByID(event_id)
          .then(res => {
              console.log(res);
              setMedia(res);
          })        
      }, [event_id])
    return (
        <Container>
            <Row><Col><h2>Example Podcast</h2></Col></Row>
            <Row>
                <Col sm="12" md="12" lg="6">
                    <div style={ { border: '1px solid rgba(0,0,0,.125)', width: '80%', height: 300, padding: 15 } }>
                        <p>id:{media['media_id']}</p>
                        <p>speaker_ids:{media['speaker_ids']}</p>
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
