import React from 'react'
import { Footer } from '@Main/components'
import { Container } from './public-page-container-components'

interface PublicPageInterface {
  children: React.ReactNode
}

export default function PublicPageContainer({ children }: PublicPageInterface) {
  return (
    <>
      <Container>{children}</Container>
      <Footer />
    </>
  )
}
