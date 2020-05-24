import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useTranslation } from 'react-i18next'

export default function UserNavigation() {
  const { t } = useTranslation()

  return (
    <Navbar>
      <Nav defaultActiveKey="/user" className="flex-column">
        <LinkContainer to="/user/home">
          <Nav.Link>{t('User.PageHome.Title')}</Nav.Link>
        </LinkContainer>
        <NavDropdown.Divider />
        <LinkContainer to="/user/cart">
          <Nav.Link>{t('User.CartPage.Title')}</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/user/orders">
          <Nav.Link>{t('User.OrdersPage.Title')}</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/user/profile">
          <Nav.Link>{t('User.PageProfile.Title')}</Nav.Link>
        </LinkContainer>
      </Nav>
    </Navbar>
  )
}
