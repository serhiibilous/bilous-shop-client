import React from 'react'
import { Container } from 'react-bootstrap'
import { AdminProductForm } from '@Main/components'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PageTitle } from '@Main/styles/admin'

export default function AdminProductNew() {
  const { t } = useTranslation()

  return (
    <Container>
      <PageTitle>{t('Admin.CreateProductPage.Title')}</PageTitle>
      <AdminProductForm />
      <hr />
      <Link to="/admin/products">{t('Admin.CreateProductPage.LinkBackToProducts')}</Link>
    </Container>
  )
}
