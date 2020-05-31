import styled from 'styled-components'
import { headerHeight } from '@Main/constants'

export const Container = styled.div`
  background: #ccc;
  display: flex;
  position: absolute;
  top: ${headerHeight}px;
  left: 0;
  right: 0;
  bottom: 0;
`

export const Navigation = styled.div`
  width: 250px;
  background: #aaa;
`

export const Content = styled.div`
  width: calc(100% - 250px);
  overflow-y: auto;
  padding: 20px 0;
`
