import React from 'react'
import { Container } from 'react-bootstrap'
import { UserForm } from '@Main/components'

export default function AdminUserEdit({ match }: any) {
  return (
    <Container>
      <h1>Користувач:</h1>
      <UserForm userId={match.params.id} />
    </Container>
  )
}
