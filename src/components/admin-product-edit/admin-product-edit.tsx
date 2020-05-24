import React from 'react'
import { useParams } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { AdminProductForm } from '@Main/components'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function AdminProductEdit() {
  const { t } = useTranslation()
  const { id } = useParams()

  return (
    <Container>
      <h1>{t('Admin.EditProductPage.Title')}</h1>
      <AdminProductForm productId={id} />
      <hr />
      <Link to="/admin/products">{t('Admin.EditProductPage.LinkBackToProducts')}</Link>
    </Container>
  )
}
