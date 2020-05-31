import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Badge } from 'react-bootstrap'
import { DropDown } from '@Main/components'
import { updateUser, logoutUser } from '@Main/store/system/actions'
import { AppState } from '@Main/store'
import { Container, Logo, Nav, NavLink, Cart } from './header-components'
import { UserService } from '@Main/services'
import { useTranslation } from 'react-i18next'
import { SiteName } from '@Main/constants'

function Header() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const userService = new UserService()
  const { loggedIn, user } = useSelector((state: AppState) => state.system)
  const [productsCount, setProductsCount] = React.useState<number>(0)

  function userLogout(e: any) {
    e.preventDefault()
    userService.logoutUser().then((res) => {
      if (res.status === 200) {
        dispatch(logoutUser())
        dispatch(updateUser(null))
        localStorage.removeItem('aut-token')
      }
    })
  }

  React.useEffect(() => {
    let count = 0
    user?.cart.forEach((product: any) => {
      count += product.count
    })
    setProductsCount(count)
  }, [user])

  return (
    <Container>
      <div className="d-flex align-items-center">
        <Logo to="/">{SiteName}</Logo>
        <Nav>
          <NavLink to="/products">{t('PublicNavigation.Products')}</NavLink>
          {!loggedIn && (
            <>
              <NavLink to="/login">{t('PublicNavigation.Login')}</NavLink>
              <NavLink to="/sign-up">{t('PublicNavigation.SignUp')}</NavLink>
            </>
          )}
        </Nav>
      </div>
      {loggedIn && (
        <div className="d-flex align-items-center">
          {productsCount !== 0 && (
            <Cart to="/user/cart">
              {t('PublicNavigation.Cart')} <Badge variant="light">{productsCount}</Badge>
            </Cart>
          )}
          <DropDown title={user?.name} placement="bottom-right">
            {user?.role === 'admin' ? (
              <DropDown.Item to="/admin/home">{t('PublicNavigation.AdminPanel')}</DropDown.Item>
            ) : (
              <>
                <DropDown.Item to="/user/home">{t('PublicNavigation.Profile')}</DropDown.Item>
                <DropDown.Item to="/user/cart">{t('PublicNavigation.Cart')}</DropDown.Item>
              </>
            )}
            <DropDown.Divider />
            <DropDown.Item to="#" onClick={userLogout}>
              {t('PublicNavigation.Logout')}
            </DropDown.Item>
          </DropDown>
        </div>
      )}
    </Container>
  )
}

export default Header
