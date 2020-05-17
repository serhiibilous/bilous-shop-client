import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function AdminNavigation() {
  return (
    <Navbar>
      <Nav defaultActiveKey="/home" className="flex-column">
        <LinkContainer to="/admin/home">
          <Nav.Link>Домашня стотінка</Nav.Link>
        </LinkContainer>
        <NavDropdown.Divider />
        <LinkContainer to="/admin/users">
          <Nav.Link>Користувачі</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/products">
          <Nav.Link>Продукти</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/categories">
          <Nav.Link>Категорії продуктів</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/orders">
          <Nav.Link>Замовлення</Nav.Link>
        </LinkContainer>
      </Nav>
    </Navbar>
  )
}

export default AdminNavigation
