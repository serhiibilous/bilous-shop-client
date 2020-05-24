import React from 'react'
import { Container } from 'react-bootstrap'
import { AdminCategoryForm } from '@Main/components'
import { useTranslation } from 'react-i18next'

export default function AdminProductCategoriesNew() {
  const { t } = useTranslation()

  return (
    <Container>
      <h1>{t('Admin.CreateCategoryPage.Title')}</h1>
      <AdminCategoryForm />
    </Container>
  )
}
