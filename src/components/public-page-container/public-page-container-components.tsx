import styled from 'styled-components'
import { headerHeight, footerHeight } from '@Main/constants'

export const Container = styled.div`
  min-height: calc(100vh - ${headerHeight}px - ${footerHeight}px);
`
