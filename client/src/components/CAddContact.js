import React from 'react'

import CAddContactNew from './CAddContactNew'

import { ModalBody, Nav, NavItem, NavLink } from "shards-react";

export default function CAddContact({event_id, setOpen}) {


    return (
      <ModalBody>
        <h4 style={{paddingTop:'20px', textAlign:'center'}}>Add a Contact</h4>

        <CAddContactNew event_id={event_id} setOpen={setOpen}/>

  </ModalBody>
    )
}