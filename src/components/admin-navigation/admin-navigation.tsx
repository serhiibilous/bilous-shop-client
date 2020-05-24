import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useTranslation } from 'react-i18next'

function AdminNavigation() {
  const { t } = useTranslation()

  return (
    <Navbar>
      <Nav defaultActiveKey="/home" className="flex-column">
        <LinkContainer to="/admin/home">
          <Nav.Link>Домашня стотінка</Nav.Link>
        </LinkContainer>
        <NavDropdown.Divider />
        <LinkContainer to="/admin/users">
          <Nav.Link>{t('Admin.UsersPage.Title')}</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/products">
          <Nav.Link>{t('Admin.ProductsPage.Title')}</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/categories">
          <Nav.Link>{t('Admin.CategoriesPage.Title')}</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/orders">
          <Nav.Link>Замовлення</Nav.Link>
        </LinkContainer>
      </Nav>
    </Navbar>
  )
}

export default AdminNavigation
