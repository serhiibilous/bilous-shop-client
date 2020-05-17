import styled from 'styled-components'
import { Toast } from 'react-bootstrap'
import { headerHeight } from '@Main/constants'

export const Container = styled.div`
  position: fixed;
  top: calc(${headerHeight}px + 15px);
  right: 15px;
  width: 300px;
  z-index: 1;
`

export const ToastContainer = styled(Toast)`
  ${({ variant }: { variant: string }) => {
    switch (variant) {
      case 'success':
        return 'color: #155724;background-color: #d4edda;border-color: #c3e6cb;'
      case 'error':
        return 'color: #721c24;background-color: #f8d7da;border-color: #f5c6cb;'
      case 'info':
        return 'color: #004085;background-color: #cce5ff;border-color: #b8daff;'
      default:
        return 'color: #004085;background-color: #cce5ff;border-color: #b8daff;'
    }
  }}
`
