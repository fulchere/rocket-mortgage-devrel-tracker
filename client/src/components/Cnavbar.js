import React, {useState} from 'react'

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import { useAuth } from '../contexts/AuthContext'

import { useHistory } from "react-router-dom"

import {
  Button,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput,
  Collapse
} from "shards-react";

export default function Cnavbar() {
  const { logout } = useAuth()
  const [error, setError] = useState('')
  const history = useHistory()

  const { currentUser } = useAuth()

  async function Logout(e){
    setError('')

    try{
      await logout()
      history.push("/login")
    }
    catch{
      setError('Failed to log out')
    }
  }

    return ( 
<Navbar type="dark" theme="primary" expand="md">
        <NavbarBrand href="/">DevRel Tracker</NavbarBrand>

          <Nav navbar>
            <NavItem>
              <NavLink active href="conferences">
                Conferences
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="talks" active>
                Talks
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="media" active>
                Other Media
              </NavLink>
            </NavItem>
          </Nav>

          <Nav navbar className="ml-auto">
            {currentUser ? <Button theme="light" onClick={() => {logout()}}>Logout</Button> : <div></div>}
          </Nav>
      </Navbar>
    )
}