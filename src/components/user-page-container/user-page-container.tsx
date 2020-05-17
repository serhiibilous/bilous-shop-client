import React from 'react'
import { UserNavigation } from '@Main/components'
import { Container, Navigation, Content } from './user-page-container-components'

function UserPageContainer({ children }: any) {
  return (
    <Container>
      <Navigation>
        <UserNavigation />
      </Navigation>
      <Content>{children}</Content>
    </Container>
  )
}

export default UserPageContainer
