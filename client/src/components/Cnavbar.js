import React from 'react'

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
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

export default function Cnavbar({loggedIn, user, logout}) {
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
          <Button theme="light" href="login">Login</Button>
          </Nav>
      </Navbar>
    )
}