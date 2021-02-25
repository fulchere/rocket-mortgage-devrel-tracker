import React, {useState} from 'react'

import { Form, FormInput, FormGroup, Container, Row, Col, Button } from "shards-react";

import CAPIService from './CAPIService'

export default function CLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
      CAPIService.login(email, password)
    }

    const handleEmailChange = (event) => {
      setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
      setPassword(event.target.value)
    }

    return (
        <Container style={{width:'100%'}}>
        <Row>
        <Col sm="12" md="4" lg="6">
        <Form onSubmit={() => {handleSubmit()}}>
        <FormGroup>
          <label htmlFor="#email">Email</label>
          <FormInput id="#email" placeholder="Email" value={email} onChange={handleEmailChange}/>
        </FormGroup>
        <FormGroup>
          <label htmlFor="#password">Password</label>
          <FormInput type="password" id="#password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
        </FormGroup>
        <Button type="submit" value="Submit">Submit</Button>
      </Form>
    </Col>
    </Row>
      </Container>
    )
}
