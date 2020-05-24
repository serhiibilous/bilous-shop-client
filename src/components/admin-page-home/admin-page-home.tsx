import React from 'react'
import { Container } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

export default function AdminPageHome() {
  const { t } = useTranslation()

  return (
    <Container>
      <h1>{t('Admin.HomePage.Title')}</h1>
      <p>{t('Admin.HomePage.Description')}</p>
    </Container>
  )
}
