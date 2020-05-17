import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  position: relative;
`

export const Title = styled.div`
  color: #fff;
  cursor: pointer;
  line-height: 30px;
  position: relative;

  &:after {
    display: inline-block;
    margin-left: 0.5em;
    vertical-align: 0.2em;
    content: '';
    border-top: 0.3em solid;
    border-right: 0.3em solid #0000;
    border-bottom: 0;
    border-left: 0.3em solid #0000;
  }
`

export const Content = styled.div`
  position: absolute;
  border: 1px solid #00000026;
  background: #fff;
  border-radius: 0.25rem;
  padding: 10px 0;
  top: 100%;
  min-width: 100%;

  ${({ placement }: { placement: string }) => {
    switch (placement) {
      case 'bottom-right':
        return 'right: 0;'
      case 'bottom-left':
        return 'left: 0;'
      default:
        return ''
    }
  }};
`

export const Item = styled(Link)`
  padding: 5px 20px;
  display: block;
  color: #212529;
  white-space: nowrap;

  &:hover {
    color: #212529;
    background-color: #f8f9fa;
  }
`

export const Divider = styled.div`
  height: 0;
  margin: 0.5rem 0;
  overflow: hidden;
  border-top: 1px solid #e9ecef;
`
