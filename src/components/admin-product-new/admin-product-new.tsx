import React from 'react'
import { Container } from 'react-bootstrap'
import { AdminProductForm } from '@Main/components'

export default function AdminProductNew() {
  return (
    <Container>
      <h1>Створити новий продукт</h1>
      <AdminProductForm method="POST" />
    </Container>
  )
}
