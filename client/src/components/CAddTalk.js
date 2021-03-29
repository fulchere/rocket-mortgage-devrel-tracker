import React, { useState } from 'react'

import { Form, FormInput, FormTextarea, ModalBody, FormGroup, Container, Row, Col, Button } from "shards-react";
import DatePicker from "react-datepicker";
import CAPIService from './CAPIService'


export default function CAddTalks() {
  const [startDate, setStartDate] = useState(new Date());
  const [data, setData] = useState({});
  const addTalk = () => {
    console.log(data);
    CAPIService.addTalk({
      ...data,
      accepted_status: false,
      // attendees: 1,
      // description: 1,
      // title: 1,
      given_status: false,
      speaker_ids: '[1,2]',
      submitted_status: false,

    })
      .then(res => {
        console.log(res);
      })
  }

  return (

    <ModalBody>
      <Form>
        <Container>
          <Row><h4 style={ { margin: 'auto', paddingTop: '20px' } }>Add a Talk</h4></Row>
          <FormGroup>
            <label htmlFor="#time">Title</label>
            <FormInput id="#title" placeholder="title" onChange={(e)=>setData({...data,title:e.target.value})}/>
          </FormGroup>
          <FormGroup>
            <label htmlFor="#attendees">Attendees</label>
            <FormInput id="#attendees" placeholder="attendees"  onChange={(e)=>setData({...data,attendees:e.target.value})}/>
          </FormGroup>
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
    //...
  )
}