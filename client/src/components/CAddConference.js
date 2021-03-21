import React, {useState} from 'react'

import CAddConferenceNew from './CAddConferenceNew'
import CAddConferenceExisting from './CAddConferenceExisting'

import { ModalBody, Nav, NavItem, NavLink } from "shards-react";

export default function CAddConference() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [newActive, setNewActive] = useState(true);


  function handleSubmit(e){
    e.preventDefault()

    //call to submit data
  }


    return (
      <ModalBody>
        <Nav tabs>
              <NavItem>{newActive ? <NavLink active>New</NavLink> : <NavLink onClick={() => {setNewActive(true)}}>New</NavLink>}</NavItem>
              <NavItem>{newActive ? <NavLink onClick={() => {setNewActive(false)}}>Existing</NavLink> : <NavLink active>Existing</NavLink>}</NavItem>
            </Nav>

            {newActive ? <CAddConferenceNew/> : <CAddConferenceExisting/> }
  </ModalBody>
    )
}
