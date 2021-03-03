import React, {useState} from 'react'

import { Form, FormInput, FormTextarea, ModalBody, FormGroup, Container, Row, Col, Button } from "shards-react";
import DatePicker from "react-datepicker";

export default function CAddTalks() {
  const [startDate, setStartDate] = useState(new Date());


    return (

      <ModalBody>
      <Form>
          <Container>
            <Row><h4 style={{margin: 'auto', paddingTop:'20px'}}>Add a Talk</h4></Row>
              <FormGroup>
                <label htmlFor="#time">Time</label>
                <FormInput id="#starttime" placeholder="Start time" />
                <FormInput id="#endtime" placeholder="End time" />
              </FormGroup>
              <div style={{float:'right'}}><label htmlFor="#contact">Date: </label><DatePicker onChange={date => setStartDate(date)} style={{float:'right'}}/></div>
              <FormGroup>
                <label htmlFor="#description_label">Description</label>
                <FormTextarea id="#description" placeholder="Brief description here..." style={{height:'157px', verticalAlign:'text-top'}}/>
              </FormGroup>
            <Button squared style={{width:'130px', height:'50px'}}>Submit</Button>
        </Container>
      </Form>
  </ModalBody>
    )
}