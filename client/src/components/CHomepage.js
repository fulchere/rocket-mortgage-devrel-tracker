import React, { useState, useEffect } from 'react'

import { ListGroup, ListGroupItem, Button, Container, Row, Col, Modal, ModalBody, FormInput,FormTextarea    } from "shards-react";


import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import CAPIService from './CAPIService'
import CHomepageFeed from './CHomepageFeed'

import { useAuth } from '../contexts/AuthContext'

import "react-big-calendar/lib/css/react-big-calendar.css";


export default function CHomepage() {

    const localizer = momentLocalizer(moment);

    const [event_data, setEvent_data] = useState([])


    const [loading, setLoading] = useState(true)

    const { currentUser } = useAuth()

    useEffect(() => {
        let mounted = true
        CAPIService.getAllUserEvents(currentUser.email)
          .then(response => {
            if (mounted) {
              setLoading(false)
            }
    
            var temp_array = []
            for (var i = 0; i < response.event_pairs.length; i++){
              temp_array.push({
                title : response.event_pairs[i].event_name,
                id : response.event_pairs[i].id,
                start : moment(response.event_pairs[i].event_start_time).toDate(),
                end : moment(response.event_pairs[i].event_end_time).toDate()    
              })
            }
            setEvent_data(temp_array)
          })
    
          return function cleanup() {
            mounted = false
          }
      }, [])




    return (
        <div> {loading ? <p>loading...</p> :
          <div>
            <Container  style = {{paddingTop: "20px", maxWidth: "90%"}}>    
              <Row>
            <Col sm="12" md="4" lg="3">
            <CHomepageFeed event_data={event_data}/>
            </Col>
            <Col>
                <Calendar localizer={localizer} defaultDate={new Date()} defaultView="month" events={event_data} style={{ height: "100vh" }} />  
                </Col>
                </Row>
            </Container>
            </div>
            }
            </div>
    )
}
