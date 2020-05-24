import React from 'react'
import { Container } from 'react-bootstrap'
import { AdminCategoryForm } from '@Main/components'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function AdminProductCategoriesEdit() {
  const { t } = useTranslation()
  const { id } = useParams()

  return (
    <Container>
      <h1>{t('Admin.EditCategoryPage.Title')}</h1>
      <AdminCategoryForm categoryId={id} />
    </Container>
  )
}
