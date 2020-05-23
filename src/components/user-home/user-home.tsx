import React from 'react'
import { Container } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

export default function UserHome() {
  const { t } = useTranslation()

  return (
    <Container>
      <h1>{t('User.PageHome.Title')}</h1>
      <p>{t('User.PageHome.Description')}</p>
    </Container>
  )
}
