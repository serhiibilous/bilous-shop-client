import React from 'react'
import { Container } from 'react-bootstrap'
import { RouteComponentProps } from 'react-router'
import { AdminCategoryForm } from '@Main/components'

export default function AdminProductCategoriesEdit({ match }: RouteComponentProps<any>) {
  return (
    <Container>
      <h1>Редагувати категорію</h1>
      <AdminCategoryForm categoryId={match.params.id} />
    </Container>
  )
}
