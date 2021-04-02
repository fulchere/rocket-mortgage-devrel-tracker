import React, {useState} from 'react'

import { Form, FormInput, FormGroup, Container, Row, Col, Button } from "shards-react";
import CAPIService from './CAPIService';


export default function CAddContactNew({event_id, setOpen}) {
  const [name, setName] = useState('')
  const [email, setPhone] = useState('')
  const [phone, setEmail] = useState('')

  async function handleSubmit(e){
      e.preventDefault()

    //call to submit data
    await CAPIService.addNewContact(name, email, phone, event_id)
    .then(response => { 
      CAPIService.addContactToEvent(response.doc_id, event_id).then(response2 => {
        console.log(response.doc_id)
        setOpen(false)
      })
    })

  }


    return (
      <Form onSubmit={handleSubmit}>
          <Container>
            <Row>
              <Col>
              <FormGroup>
                <label htmlFor="#location">Contact Info</label>
                <FormInput id="#name" placeholder="Name" onChange={(e) => {setName(e.target.value)}}/>
                <FormInput id="#phone" placeholder="Phone Number" onChange={(e) => {setPhone(e.target.value)}}/>
                <FormInput id="#email" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}}/>
              </FormGroup>    
              </Col>
            </Row>
            <Button squared style={{width:'130px', height:'50px', float:'right'}}>Submit</Button>
        </Container>
      </Form>
    )
}

