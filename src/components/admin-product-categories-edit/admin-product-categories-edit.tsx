import React from 'react'
import { Container } from 'react-bootstrap'
import { AdminCategoryForm } from '@Main/components'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PageTitle } from '@Main/styles/admin'

export default function AdminProductCategoriesEdit() {
  const { t } = useTranslation()
  const { id } = useParams()

  return (
    <Container>
      <PageTitle>{t('Admin.EditCategoryPage.Title')}</PageTitle>
      <AdminCategoryForm categoryId={id} />
    </Container>
  )
}
