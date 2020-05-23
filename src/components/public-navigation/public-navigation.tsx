import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Badge } from 'react-bootstrap'
import { DropDown } from '@Main/components'
import { updateUser, logoutUser } from '@Main/store/system/actions'
import { AppState } from '@Main/store'
import { Header, Logo, Nav, NavLink, Cart } from './public-navigation-components'
import { UserService } from '@Main/services'

function PublicNavigation() {
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
          <Logo to="/">Bilous.shop</Logo>
          <Nav>
            <NavLink to="/products">Продукти</NavLink>
            {!loggedIn && (
              <>
                <NavLink to="/login">Логін</NavLink>
                <NavLink to="/sign-up">Реєстрація</NavLink>
              </>
            )}
          </Nav>
        </div>
        {loggedIn && (
          <div className="d-flex align-items-center">
            {productsCount !== 0 && (
              <Cart to="/user/cart">
                Кошик <Badge variant="light">{productsCount}</Badge>
              </Cart>
            )}
            <DropDown title={user ? user.name : ''} placement="bottom-right">
              {user && user.role === 'admin' ? (
                <DropDown.Item to="/admin/home">Адмін-панель</DropDown.Item>
              ) : (
                <>
                  <DropDown.Item to="/user/home">Кабінет</DropDown.Item>
                  <DropDown.Item to="/user/cart">Кошик</DropDown.Item>
                </>
              )}
              <DropDown.Divider />
              <DropDown.Item to="#" onClick={userLogout}>
                Вийти
              </DropDown.Item>
            </DropDown>
          </div>
        )}
      </Header>
    </>
  )
}

export default PublicNavigation
