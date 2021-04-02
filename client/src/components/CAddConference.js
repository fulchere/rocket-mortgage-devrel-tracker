import React, {useState} from 'react'

import CAddConferenceNew from './CAddConferenceNew'
import CAddConferenceExisting from './CAddConferenceExisting'

import { ModalBody, Nav, NavItem, NavLink } from "shards-react";

export default function CAddConference({event_data, setOpen}) {
  const [newActive, setNewActive] = useState(true);


    return (
      <ModalBody>

        <h4 style={{paddingTop:'20px', textAlign:'center'}}>Add a conference</h4>
        <Nav tabs>
              <NavItem>{newActive ? <NavLink active>New</NavLink> : <NavLink onClick={() => {setNewActive(true)}}>New</NavLink>}</NavItem>
              <NavItem>{newActive ? <NavLink onClick={() => {setNewActive(false)}}>Existing</NavLink> : <NavLink active>Existing</NavLink>}</NavItem>
            </Nav>

            {newActive ? <CAddConferenceNew setOpen={setOpen}/> : <CAddConferenceExisting user_event_data={event_data} setOpen={setOpen}/> }
  </ModalBody>
    )
}
