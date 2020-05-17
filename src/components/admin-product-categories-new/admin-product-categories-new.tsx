import React from 'react'
import { Container } from 'react-bootstrap'
import { AdminCategoryForm } from '@Main/components'

export default function AdminProductCategoriesNew() {
  return (
    <Container>
      <h1>Створити нову категорію товару</h1>
      <AdminCategoryForm />
    </Container>
  )
}
