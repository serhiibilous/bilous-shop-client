import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export default function UserNavigation() {
  return (
    <Navbar>
      <Nav defaultActiveKey="/user" className="flex-column">
        <LinkContainer to="/user/home">
          <Nav.Link>Домашня сторінка</Nav.Link>
        </LinkContainer>
        <NavDropdown.Divider />
        <LinkContainer to="/user/cart">
          <Nav.Link>Кошик</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/user/orders">
          <Nav.Link>Замовлення</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/user/profile">
          <Nav.Link>Профіль</Nav.Link>
        </LinkContainer>
      </Nav>
    </Navbar>
  )
}
