import React, {useState, useEffect} from 'react'

import { Form, FormInput, FormTextarea, FormGroup, FormCheckbox, FormSelect, Container, Row, Col, Button,   Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "shards-react";
import DatePicker from "react-datepicker";
import moment from 'moment'
import CAPIService from './CAPIService';

import { useAuth } from '../contexts/AuthContext'

export default function CAddConferenceNew() {

  const { currentUser } = useAuth()

  const [userID, setUserID] = useState('')

  const [name, setName] = useState('')

  const [address, setAddress] = useState('')
  const [facility, setFacility] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zipcode, setZipcode] = useState('')

  const [deiAffiliation, setDEIAffiliation] = useState(false)
  const [recruitingPartner, setRecruitingPartner] = useState(false)
  const [attendees, setAttendees] = useState('')

  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  const [startAMPM, setStartAMPM] = useState('')
  const [endAMPM, setEndAMPM] = useState('')

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [description, setDescription] = useState('')
  

  useEffect(() => {
    CAPIService.getSpeaker(currentUser.email)
      .then(response => {
        setUserID(response.speaker_id)
      })
  }, [])

  function handleSubmit(e){
    const start = FormatDate(startDate) + 'T' + startTime + ':00'
    const end = FormatDate(endDate) + 'T' + endTime + ':00'



    //call to submit data
    CAPIService.addNewEventToSpeaker(userID, name, address, facility, attendees, deiAffiliation, description, start, end, "", recruitingPartner, "")

  }

   function FormatDate(date) {
    var mm = date.getMonth() + 1;
    var dd = date.getDate();
  
    return [date.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
           ].join('-');
  };


    return (
      <Form onSubmit={handleSubmit}>
          <Container>
            <Row><h4 style={{margin: 'auto', paddingTop:'20px'}}>New Conference</h4></Row>
            <Row style={{paddingBottom: '20px'}}><FormInput id="#conference_name" placeholder="Conference name" onChange={(e) => {setName(e.target.value)}}/></Row>
            <Row>
              <Col>
              <FormGroup>
                <label htmlFor="#location">Location Info</label>
                <FormInput id="#facility" placeholder="Facility" onChange={(e) => {setFacility(e.target.value)}}/>
                <FormInput id="#address" placeholder="Address" onChange={(e) => {setAddress(e.target.value)}}/>
                <FormInput id="#city" placeholder="City" onChange={(e) => {setCity(e.target.value)}}/>
                <FormInput id="#state" placeholder="State" onChange={(e) => {setState(e.target.value)}}/>
                <FormInput id="#zipcode" placeholder="Zipcode" onChange={(e) => {setZipcode(e.target.value)}}/>

              </FormGroup>

              <FormGroup>
                <label htmlFor="#other">Other</label>
                <FormCheckbox checked={deiAffiliation} onChange={() => {setDEIAffiliation(!deiAffiliation)}}>DEI Affiliation</FormCheckbox>
                <FormCheckbox checked={recruitingPartner} onChange={() => {setRecruitingPartner(!recruitingPartner)}}>Recruiting Partner</FormCheckbox> 
                <FormInput id="#numofattendees" placeholder="Number of attendees" onChange={(e) => {setAttendees(e.target.value)}}/>               
              </FormGroup>
              </Col>
              <Col>
              <FormGroup>
                <label htmlFor="#time">Time/Date</label>
                <div>
                <FormInput id="#starttime" placeholder="Start time, ex. 09:00" style={{width : '270px', display: "inline-block"}} onChange={(e) => {setStartTime(e.target.value)}}/>
                <FormSelect style={{display: "inline-block", width : "auto", float:"right"}} onChange={(e) => {setStartAMPM(e.target.value)}}>
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </FormSelect>
                <div style={{float:'right', paddingTop:'5px'}}><label htmlFor="#startdate">Start Date: </label><DatePicker selected={startDate} onChange={date => setStartDate(date)} style={{float:'right'}}/></div>
                  </div>
                <div>
                <FormInput id="#endtime" placeholder="End time" style={{width : '270px', display: "inline-block"}} onChange={(e) => {setEndTime(e.target.value)}} />
                <FormSelect style={{display: "inline-block", width : "auto", float:"right"}} onChange={(e) => {setEndAMPM(e.target.value)}}>
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </FormSelect>
                <div style={{float:'right', paddingTop:'5px', paddingBottom:'20px'}}><label htmlFor="#enddate">End Date: </label><DatePicker selected={endDate} onChange={date => setEndDate(date)} style={{float:'right'}}/></div>
                  </div>
              </FormGroup>
              <div style={{float:'right'}}><label htmlFor="#startdate">Start Date: </label><DatePicker selected={startDate} onChange={date => setStartDate(date)} style={{float:'right'}}/></div>
              <div style={{float:'right'}}><label htmlFor="#enddate">End Date: </label><DatePicker selected={endDate} onChange={date => setEndDate(date)} style={{float:'right'}}/></div>
              <FormGroup>
                <FormTextarea id="#description" placeholder="Brief description here..." style={{height:'165px'}} onChange={(e) => {setDescription(e.target.value)}}/>
              </FormGroup>
              </Col>
            </Row>
            <Button squared style={{width:'130px', height:'50px', float:'right'}}>Submit</Button>
        </Container>
      </Form>
    )
}

