import React from 'react'
import { AdminNavigation } from '@Main/components'
import { Container, Navigation, Content } from './admin-page-container-components'

type Props = {
  children: React.ReactNode
}

export default function AdminPageContainer({ children }: Props) {
  return (
    <Container>
      <Navigation>
        <AdminNavigation />
      </Navigation>
      <Content>{children}</Content>
    </Container>
  )
}
