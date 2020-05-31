import styled from 'styled-components'
import { footerHeight } from '@Main/constants'
import { primaryDark, white } from '@Main/styles/colors'

export const Container = styled.footer`
  background: ${primaryDark};
  padding: 10px 15px;
  height: ${footerHeight}px;
`

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: ${white};
`
