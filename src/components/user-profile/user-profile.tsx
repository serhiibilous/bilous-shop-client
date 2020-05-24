import React from 'react'
import { Container } from 'react-bootstrap'
import { UserForm } from '@Main/components'
import { useTranslation } from 'react-i18next'

export default function UserProfile() {
  const { t } = useTranslation()

  return (
    <Container>
      <h1>{t('User.PageProfile.Title')}</h1>
      <br />
      <UserForm />
    </Container>
  )
}
