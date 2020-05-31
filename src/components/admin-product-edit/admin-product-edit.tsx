import React from 'react'
import { useParams } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { AdminProductForm } from '@Main/components'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { PageTitle } from '@Main/styles/admin'

export default function AdminProductEdit() {
  const { t } = useTranslation()
  const { id } = useParams()

  return (
    <Container>
      <PageTitle>{t('Admin.EditProductPage.Title')}</PageTitle>
      <AdminProductForm productId={id} />
      <hr />
      <Link to="/admin/products">{t('Admin.EditProductPage.LinkBackToProducts')}</Link>
    </Container>
  )
}
