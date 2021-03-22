import React, {useState} from 'react'

import { Form, FormInput, FormTextarea, FormGroup, Container, Row, Col, Button } from "shards-react";
import DatePicker from "react-datepicker";

export default function CAddConferenceNew() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());


  function handleSubmit(e){
    e.preventDefault()

    //call to submit data
  }


    return (
      <Form>
          <Container>
            <Row><h4 style={{margin: 'auto', paddingTop:'20px'}}>New Conference</h4></Row>
            <Row style={{paddingBottom: '20px'}}><FormInput id="#conference_name" placeholder="Conference name or search for existing conference"/></Row>
            <Row>
              <Col>
              <FormGroup>
                <label htmlFor="#location">Location Info</label>
                <FormInput id="#facility" placeholder="Facility" />
                <FormInput id="#address" placeholder="Address" />
                <FormInput id="#city" placeholder="City" />
                <FormInput id="#state" placeholder="State" />
                <FormInput id="#zipcode" placeholder="Zipcode" />

              </FormGroup>

              <FormGroup>
                <label htmlFor="#contact">Contact Info</label>
                <FormInput id="#contactname" placeholder="Contact" />
                <FormInput id="#contactemail" placeholder="Email" />
                <FormInput id="#contactphone" placeholder="Phone Number" />
                
              </FormGroup>
              </Col>
              <Col>
              <FormGroup>
                <label htmlFor="#time">Time</label>
                <FormInput id="#starttime" placeholder="Start time" />
                <FormInput id="#endtime" placeholder="End time" />
              </FormGroup>
              <div style={{float:'right'}}><label htmlFor="#startdate">Start Date: </label><DatePicker selected={startDate} onChange={date => setStartDate(date)} style={{float:'right'}}/></div>
              <div style={{float:'right'}}><label htmlFor="#enddate">End Date: </label><DatePicker selected={endDate} onChange={date => setEndDate(date)} style={{float:'right'}}/></div>
              <FormGroup>
                <FormTextarea id="#description" placeholder="Brief description here..." style={{height:'157px', verticalAlign:'text-top'}}/>
              </FormGroup>
              </Col>
            </Row>
            <Button squared style={{width:'130px', height:'50px'}}>Submit</Button>
        </Container>
      </Form>
    )
}

