import React from 'react'
import { Container } from './page-container-components'

type Props = {
  children: React.ReactNode
}

export default function PageContainer({ children }: Props) {
  return <Container>{children}</Container>
}
