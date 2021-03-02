import React, {useState, useRef} from 'react'

import { Form, FormInput, FormGroup, Container, Row, Col, Button, Alert } from "shards-react";

import { useAuth } from '../contexts/AuthContext'

export default function CRegister() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
    const { signup, currentUser } = useAuth()

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e){
      e.preventDefault()

      try{
        setError('')
        setLoading(true)
        await signup(email, password)
      }
      catch{
        setError('Failed to sign up.')
      }

      setLoading(false)
      
    }

    const handleEmailChange = (event) => {
      setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
      setPassword(event.target.value)
    }


    return (
        <Container style={{width:'100%'}}>
          {JSON.stringify(currentUser)}
        <Row>
        <Col sm="12" md="4" lg="6">
          {error && <Alert theme="danger">{error}</Alert>}
        <Form  onSubmit={handleSubmit}>
        <FormGroup id="email">
          <label htmlFor="#email">Email</label>
          <FormInput placeholder="Email" type="email" value={email} onChange={handleEmailChange} required/>
        </FormGroup>
        <FormGroup id="password">
          <label htmlFor="#password">Password</label>
          <FormInput type="password" placeholder="Password" value={password} onChange={handlePasswordChange} required/>
        </FormGroup>
        <Button disabled={loading} type="submit" value="Submit">Submit</Button>
      </Form>
    </Col>
    </Row>
      </Container>
    )
}