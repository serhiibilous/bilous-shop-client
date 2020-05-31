import React from 'react'
import { Container } from 'react-bootstrap'
import { AdminCategoryForm } from '@Main/components'
import { useTranslation } from 'react-i18next'
import { PageTitle } from '@Main/styles/admin'

export default function AdminProductCategoriesNew() {
  const { t } = useTranslation()

  return (
    <Container>
      <PageTitle>{t('Admin.CreateCategoryPage.Title')}</PageTitle>
      <AdminCategoryForm />
    </Container>
  )
}
