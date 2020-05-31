import React from 'react'
import { Container } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { PageTitle, PageDescription } from '@Main/styles/admin'

export default function AdminPageHome() {
  const { t } = useTranslation()

  return (
    <Container>
      <PageTitle>{t('Admin.HomePage.Title')}</PageTitle>
      <PageDescription>{t('Admin.HomePage.Description')}</PageDescription>
    </Container>
  )
}
