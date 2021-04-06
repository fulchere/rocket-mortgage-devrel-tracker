import React, { useState,useEffect } from 'react';
import DatePicker from 'react-date-picker';
import {Container, Row, Col} from 'shards-react'
import CAPIService from './CAPIService'

import moment from 'moment'


export default function CEventMedia({event_id}) {
    const [value, onChange] = useState(new Date());
    const [media, setMedia] = useState({});
    useEffect(() => {
        CAPIService.getMediaByID(event_id)
          .then(res => {
              console.log(res);
              setMedia(res);
          })        
      }, [event_id])
    return (
        <Container>
            <Row><Col><h2>{media.name}</h2></Col></Row>
            <Row>
                <Col sm="12" md="12" lg="6">
                    <div style={ { border: '1px solid rgba(0,0,0,.125)', width: '80%', height: 200, padding: 15 } }>
                        <p>{media['description']}</p>
                    </div>
                    <div style = {{border: '1px solid rgba(0,0,0,.125)', marginTop:'20px', width: '80%'}}>
                        {media['link']}
                    </div>
                </Col>

                <Col sm="12" md="12" lg="6">
                    <div>
                        Entered {moment(media['time']).format('LL')}
                    </div>
                    <div>
                    Type: {media['type']}
                    </div>
                </Col>
            </Row>

        </Container>
    )
}
