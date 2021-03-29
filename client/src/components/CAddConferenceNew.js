import React, {useState} from 'react'

import { Form, FormInput, FormTextarea, FormGroup, FormCheckbox, Container, Row, Col, Button,   Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "shards-react";
import DatePicker from "react-datepicker";

export default function CAddConferenceNew() {
  const [deiAffiliation, setDEIAffiliation] = useState(false)
  const [recruitingPartner, setRecruitingPartner] = useState(false)

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [startOpen, setStartOpen] = useState(false)
  const [endOpen, setEndOpen] = useState(false)

  const [startHours, setStartHours] = useState('AM')
  const [endHours, setEndHours] = useState('AM')

  const startDropdown = () => {
    setStartOpen(!startOpen)

}

const endDropdown = () => {
  setEndOpen(!endOpen)

}



  function handleSubmit(e){
    e.preventDefault()

    //call to submit data
  }


    return (
      <Form>
          <Container>
            <Row><h4 style={{margin: 'auto', paddingTop:'20px'}}>New Conference</h4></Row>
            <Row style={{paddingBottom: '20px'}}><FormInput id="#conference_name" placeholder="Conference name"/></Row>
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
                <label htmlFor="#other">Other</label>
                <FormCheckbox checked={deiAffiliation} onChange={() => {setDEIAffiliation(!deiAffiliation)}}>DEI Affiliation</FormCheckbox>
                <FormCheckbox checked={recruitingPartner} onChange={() => {setRecruitingPartner(!recruitingPartner)}}>Recruiting Partner</FormCheckbox> 
                <FormInput id="#numofattendees" placeholder="Number of attendees" />               
              </FormGroup>
              </Col>
              <Col>
              <FormGroup>
                <label htmlFor="#time">Time/Date</label>
                <div>
                <FormInput id="#starttime" placeholder="Start time, ex 09:00" style={{width : '230px', display: "inline-block"}}/>
                <Dropdown open={startOpen} toggle={startDropdown} group style={{display: "inline-block"}}>
                  <Button>{startHours}</Button>
                  <DropdownToggle split />
                  <DropdownMenu>
                    <DropdownItem onClick={() => {setStartHours('AM')}}>AM</DropdownItem>
                    <DropdownItem onClick={() => {setStartHours('PM')}}>PM</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <div style={{float:'right', paddingTop:'5px'}}><label htmlFor="#startdate">Start Date: </label><DatePicker selected={startDate} onChange={date => setStartDate(date)} style={{float:'right'}}/></div>
                  </div>
                <div>
                <FormInput id="#endtime" placeholder="End time" style={{width : '230px', display: "inline-block"}}/>
                <Dropdown open={endOpen} toggle={endDropdown} group style={{display: "inline-block"}}>
                  <Button>{endHours}</Button>
                  <DropdownToggle split />
                  <DropdownMenu>
                    <DropdownItem onClick={() => {setEndHours('AM')}}>AM</DropdownItem>
                    <DropdownItem onClick={() => {setEndHours('PM')}}>PM</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <div style={{float:'right', paddingTop:'5px'}}><label htmlFor="#enddate">End Date: </label><DatePicker selected={endDate} onChange={date => setEndDate(date)} style={{float:'right'}}/></div>
                  </div>
              </FormGroup>
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

