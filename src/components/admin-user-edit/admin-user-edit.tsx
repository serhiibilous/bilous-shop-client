import React from 'react'
import { Container } from 'react-bootstrap'
import { UserForm } from '@Main/components'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'

export default function AdminUserEdit() {
  const { t } = useTranslation()
  const { id } = useParams()

  return (
    <Container>
      <h1>{t('Admin.EditUserPage.Title')}</h1>
      <UserForm userId={id} />
      <hr />
      <Link to="/admin/users">{t('Admin.EditUserPage.LinkBackToUsers')}</Link>
    </Container>
  )
}
