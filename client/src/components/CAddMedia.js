import React, { useState } from 'react'

import { Form, FormInput, FormTextarea, ModalBody, FormGroup, Container, Row, Col, Button } from "shards-react";
import DatePicker from "react-datepicker";
import CAPIService from './CAPIService'
import { useAuth } from '../contexts/AuthContext'

export default function CAddMedia() {
    const [startDate, setStartDate] = useState(new Date());
    const [data, setData] = useState({});
    const { currentUser } = useAuth()

    const addMedia = async () => {
        const {speaker_id} = await CAPIService.getSpeaker(currentUser.email)
        console.log(startDate);
        CAPIService.addMedia({
          ...data,
          speaker_ids: speaker_id, 
          time:  startDate
        })
          .then(res => {
            console.log(res);
          })
      }


    return (

        <ModalBody>
            <Form>
                <Container>
                    <Row><h4 style={ { margin: 'auto', paddingTop: '20px' } }>Add a Media</h4></Row>
                    <FormGroup>
                        <label htmlFor="#type">Type</label>
                        <FormInput id="#type" placeholder="type"  onChange={(e)=>setData({...data,type:e.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="#name">name</label>
                        <FormInput id="#name" placeholder="name"  onChange={(e)=>setData({...data,name:e.target.value})} />
                    </FormGroup>
                    <div style={ { float: 'right' } }><label htmlFor="#time">Date: </label><input id='time' type='datetime-local' value={startDate} onChange={ date => setStartDate(date.target.value) } style={ { float: 'right' } } /></div>
                    <FormGroup>
                        <label htmlFor="#description">Description</label>
                        <FormTextarea id="#description"  onChange={(e)=>setData({...data,description:e.target.value})} placeholder="Brief description here..." style={ { height: '157px', verticalAlign: 'text-top' } } />
                    </FormGroup>
                    <Button onClick={ addMedia } squared style={ { width: '130px', height: '50px' } }>Submit</Button>
                </Container>
            </Form>
        </ModalBody>
    )
}