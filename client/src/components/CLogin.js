import React from 'react'

import { Form, FormInput, FormGroup, Container, Row, Col, Button } from "shards-react";

export default function CLogin() {
    return (
        <Container >
        <Row>
        <Col sm="12" md="4" lg="6">
        <Form>
        <FormGroup>
          <label htmlFor="#username">Username</label>
          <FormInput id="#username" placeholder="Username" />
        </FormGroup>
        <FormGroup>
          <label htmlFor="#password">Password</label>
          <FormInput type="password" id="#password" placeholder="Password" />
        </FormGroup>
        <Button type="submit" value="Submit">Submit</Button>
      </Form>
    </Col>
    </Row>
      </Container>
    )
}
