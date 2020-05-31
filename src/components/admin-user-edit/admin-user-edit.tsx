import React from 'react'
import { Container } from 'react-bootstrap'
import { UserForm } from '@Main/components'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { PageTitle } from '@Main/styles/admin'

export default function AdminUserEdit() {
  const { t } = useTranslation()
  const { id } = useParams()

  return (
    <Container>
      <PageTitle>{t('Admin.EditUserPage.Title')}</PageTitle>
      <UserForm userId={id} />
      <hr />
      <Link to="/admin/users">{t('Admin.EditUserPage.LinkBackToUsers')}</Link>
    </Container>
  )
}
