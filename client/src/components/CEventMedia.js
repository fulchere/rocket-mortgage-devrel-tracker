import React, { useState,useEffect } from 'react';
import DatePicker from 'react-date-picker';
import {Container, Row, Col} from 'shards-react'
import CAPIService from './CAPIService'

import moment from 'moment'
import { faLink,faFileAlt,faClock,faTags } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CEventMedia({event_id}) {
    const [value, onChange] = useState(new Date());
    const [media, setMedia] = useState({});
    useEffect(() => {
        CAPIService.getMediaByID(event_id)
          .then(res => {
              setMedia(res);
          })        
      }, [event_id])
    return (
        <Container>
            <Row><Col><h2 style={{textAlign:'center',marginBottom:50}}>{media.name}</h2></Col></Row>
            <Row>
                <Col sm="12" md="12" lg="6">
                    {/* <div style={ { border: '1px solid rgba(0,0,0,.125)', width: '80%', height: 200, padding: 15 } }>
                        <p>{media['description']}</p>
                    </div> */}
                    <div style={{display:'flex',fontSize:20}}>
                        <div style={{marginRight:5,width:170,fontWeight:'bold'}}>
                            <FontAwesomeIcon style={{marginRight:10}} icon={ faFileAlt } />
                            description :
                        </div>
                        <span style={{flex:1}}>{media['description']}</span>
                    </div>
                    <div style={{marginTop:20,display:'flex',flexWrap:'wrap',fontSize:20}}>
                        <div style={{marginRight:10,width:120,fontWeight:'bold'}}>
                            <FontAwesomeIcon style={{marginRight:10}} icon={ faLink } />
                            Link :
                        </div>
                       <span style={{flex:1}}>{media['link']}</span>
                    </div>
                </Col>

                <Col sm="12" md="12" lg="6">
                    <div style={{display:'flex',flexWrap:'wrap',fontSize:20}}>
                        <div style={{marginRight:10,width:120,fontWeight:'bold'}}>
                            <FontAwesomeIcon  style={{marginRight:10}} icon={ faClock } />
                            Entered :
                        </div>
                        {moment(media['time']).format('LL')}
                    </div>
                    <div style={{marginTop:20,display:'flex',flexWrap:'wrap',fontSize:20}}>
                        <div style={{marginRight:10,width:120,fontWeight:'bold'}}>
                            <FontAwesomeIcon  style={{marginRight:10}} icon={ faTags } />
                            Type :
                        </div>
                        {media['type']}
                    </div>
                    {/* <div>
                        Entered {moment(media['time']).format('LL')}
                    </div>
                    <div>
                    Type: {media['type']}
                    </div> */}
                </Col>
            </Row>

        </Container>
    )
}
