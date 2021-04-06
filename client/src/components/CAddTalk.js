import React, { useState } from 'react'

import { Form, FormInput, FormTextarea, ModalBody, FormGroup, Container, Row, Col, Button } from "shards-react";
import DatePicker from "react-datepicker";
import CAPIService from './CAPIService'
import { useAuth } from '../contexts/AuthContext'

export default function CAddTalks(props) {
  const { currentUser } = useAuth()
  const [startDate, setStartDate] = useState(new Date());
  const [data, setData] = useState({});
  const addTalk = async () => {
    
    const {speaker_id} = await CAPIService.getSpeaker(currentUser.email)
    console.log(speaker_id)
    await CAPIService.addTalk({
      ...data,
      accepted_status: false,
      // attendees: 1,
      // description: 1,
      // title: 1,
      given_status: false,
      event_ids:"['5euPqRxuyX86h3b4MVFy']",
      speaker_ids: speaker_id,
      submitted_status: false,

    })
      .then(res => {
        console.log(res);
        props.closeModal()
        window.location.reload();
      })
     
  }

  return (

    <ModalBody>
      <Form>
        <Container>
          <Row><h4 style={ { margin: 'auto', paddingTop: '20px' } }>Add a Talk</h4></Row>
          <FormGroup>
            <label htmlFor="#time">Title</label>
            <FormInput id="#title" placeholder="Title" onChange={(e)=>setData({...data,title:e.target.value})}/>
          </FormGroup>
          {/*<FormGroup>
            <label htmlFor="#attendees">Attendees</label>
            <FormInput id="#attendees" placeholder="attendees"  onChange={(e)=>setData({...data,attendees:e.target.value})}/>
          </FormGroup>*/}
          {/* <FormGroup>
            <label htmlFor="#time">Time</label>
            <FormInput id="#starttime" placeholder="Start time" />
            <FormInput id="#endtime" placeholder="End time" />
          </FormGroup> */}
          {/* <div style={ { float: 'right' } }><label htmlFor="#contact">Date: </label><DatePicker onChange={ date => setStartDate(date) } style={ { float: 'right' } } /></div> */ }
          <FormGroup>
            <label htmlFor="#description_label">Description</label>
            <FormTextarea  onChange={(e)=>setData({...data,description:e.target.value})} id="#description" placeholder="Brief description here..." style={ { height: '157px', verticalAlign: 'text-top' } } />
          </FormGroup>
          <Button onClick={ addTalk } squared style={ { width: '130px', height: '50px' } }>Submit</Button>
        </Container>
      </Form>
    </ModalBody>
  )
}