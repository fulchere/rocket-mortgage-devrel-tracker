import React, { useState } from 'react'

import { Form, FormInput, FormTextarea, ModalBody, FormGroup, Container, Row, Col, Button } from "shards-react";
import DatePicker from 'react-date-picker';

import CAPIService from './CAPIService'
import { useAuth } from '../contexts/AuthContext'

export default function CAddMedia() {
    const [startDate, setStartDate] = useState(new Date());
    const [data, setData] = useState({});
    const [value, onChange] = useState(new Date());

    const { currentUser } = useAuth()

    const addMedia = async () => {
        const {speaker_id} = await CAPIService.getSpeaker(currentUser.email)
        console.log(startDate);
        CAPIService.addMedia({
          ...data,
          speaker_ids: speaker_id, 
          time: value
        })
          .then(res => {
            console.log(res);
          })
      }


    return (

        <ModalBody>
            <Form>
                <Container>
                    <Row><h4 style={ { margin: 'auto' } }>Add new Media</h4></Row>
                    <FormGroup>
                        <label htmlFor="#name">Name</label>
                        <FormInput id="#name" placeholder="Name"  onChange={(e)=>setData({...data,name:e.target.value})} />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="#type">Type</label>
                        <FormInput id="#type" placeholder="Type"  onChange={(e)=>setData({...data,type:e.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="#link">Content link</label>
                        <FormInput id="#link" placeholder="Link"  onChange={(e)=>setData({...data,link:e.target.value})} />
                    </FormGroup>
                    <div style={ { float: 'right' } }><label htmlFor="#time">Date: </label><DatePicker
                        onChange={onChange}
                        value={value}
                    /></div>
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