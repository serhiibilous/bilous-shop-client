import React from 'react'
import { Container } from 'react-bootstrap'
import { AdminProductForm } from '@Main/components'
import { RouteComponentProps } from 'react-router'

interface Props {
  id: string
}

export default function AdminProductEdit({ match }: RouteComponentProps<Props>) {
  return (
    <Container>
      <h1>Редагувати новий продукт</h1>
      <AdminProductForm method="PATCH" productId={match.params.id} />
    </Container>
  )
}
