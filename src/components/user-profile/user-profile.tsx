import React from 'react'
import { Container } from 'react-bootstrap'
import { UserForm } from '@Main/components'

export default function UserProfile() {
  return (
    <Container>
      <h1>Профіль</h1>
      <br />
      <UserForm />
    </Container>
  )
}
