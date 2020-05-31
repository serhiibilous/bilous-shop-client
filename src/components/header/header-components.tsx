import styled from 'styled-components'
import { headerHeight } from '@Main/constants'
import { Link } from 'react-router-dom'
import { primaryDark, white, secondaryLight } from '@Main/styles/colors'

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${headerHeight}px;
  background: ${primaryDark};
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px 12px;
`

const HeaderLink = styled(Link)`
  color: ${white};

  &:hover {
    color: ${secondaryLight};
  }
`

export const Logo = styled(HeaderLink)`
  font-size: 20px;
`

export const Nav = styled.nav`
  margin: 3px 0 0 20px;
`

export const NavLink = styled(HeaderLink)`
  margin: 0 10px;
`

export const Cart = styled(HeaderLink)`
  margin-right: 30px;

  .badge {
    margin-left: 5px;
  }
`
