import styled from 'styled-components'
import { headerHeight } from '@Main/constants'
import { Link } from 'react-router-dom'

export const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${headerHeight}px;
  background: #343a40;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px 12px;
`

export const Logo = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-size: 20px;

  &:hover {
    color: #f8f9fa;
  }
`

export const Nav = styled.nav`
  margin: 3px 0 0 20px;
`

export const NavLink = styled(Link)`
  color: #fff;
  margin: 0 10px;

  &:hover {
    color: #f8f9fa;
  }
`

export const Cart = styled(Link)`
  color: #fff;
  margin-right: 30px;

  &:hover {
    color: #f8f9fa;
  }

  .badge {
    margin-left: 5px;
  }
`
