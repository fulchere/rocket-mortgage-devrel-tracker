import React from 'react'

import { Form, FormInput, FormGroup } from "shards-react";

export default function CAddConference() {
    return (
        <Form>
        <FormGroup>
          <label htmlFor="#username">Username</label>
          <FormInput id="#username" placeholder="Username" />
        </FormGroup>
        <FormGroup>
          <label htmlFor="#password">Password</label>
          <FormInput type="password" id="#password" placeholder="Password" />
        </FormGroup>
      </Form>
    )
}
