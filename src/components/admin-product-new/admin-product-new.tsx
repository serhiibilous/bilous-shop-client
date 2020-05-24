import React from 'react'
import { Container } from 'react-bootstrap'
import { AdminProductForm } from '@Main/components'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function AdminProductNew() {
  const { t } = useTranslation()

  return (
    <Container>
      <h1>{t('Admin.CreateProductPage.Title')}</h1>
      <AdminProductForm />
      <hr />
      <Link to="/admin/products">{t('Admin.CreateProductPage.LinkBackToProducts')}</Link>
    </Container>
  )
}
