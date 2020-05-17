import React from 'react'
import { AdminNavigation } from '@Main/components'
import { Container, Navigation, Content } from './admin-page-container-components'

type Props = {
  children: React.ReactNode
}

function AdminPageContainer({ children }: Props) {
  return (
    <Container>
      <Navigation>
        <AdminNavigation />
      </Navigation>
      <Content>{children}</Content>
    </Container>
  )
}

export default AdminPageContainer
