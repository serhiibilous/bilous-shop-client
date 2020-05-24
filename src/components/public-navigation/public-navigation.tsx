import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Badge } from 'react-bootstrap'
import { DropDown } from '@Main/components'
import { updateUser, logoutUser } from '@Main/store/system/actions'
import { AppState } from '@Main/store'
import { Header, Logo, Nav, NavLink, Cart } from './public-navigation-components'
import { UserService } from '@Main/services'
import { useTranslation } from 'react-i18next'
import { SiteName } from '@Main/constants'

function PublicNavigation() {
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
    if (user && user.cart && user.cart.length) {
      user.cart.forEach((product: any) => {
        count += product.count
      })
    }
    setProductsCount(count)
  }, [user])

  return (
    <>
      <Header>
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
            <DropDown title={user ? user.name : ''} placement="bottom-right">
              {user && user.role === 'admin' ? (
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
      </Header>
    </>
  )
}

export default PublicNavigation
