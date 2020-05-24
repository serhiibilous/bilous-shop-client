import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Container, InputGroup, FormControl, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { updateUserCart } from '@Main/store/system/actions'
import { TableContainer, TitlePage } from './user-cart-components'
import { formatMoney } from '@Main/utils'
import { AppState } from '@Main/store'
import { CartProduct } from '@Main/types'
import { UserService } from '@Main/services'
import { useTranslation } from 'react-i18next'

function UserCart() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { token, user } = useSelector((state: AppState) => state.system)
  const [cart, setCart] = React.useState<CartProduct[] | undefined>(user?.cart)
  const [sum, setSum] = React.useState(0)
  const userService = new UserService(token!)

  function handleChangeCart(e: any, id: string, action: string, count: number) {
    e.preventDefault()
    if (action === 'REMOVE' && count === 1) return false
    userService
      .updateUserCart({ action: action }, id)
      .then((data) => {
        if (data.products) {
          setCart(data.products)
          dispatch(updateUserCart(data.products))
        }
      })
      .catch((error) => console.log(error))
  }

  React.useEffect(() => {
    let price = 0
    cart &&
      cart.forEach((product: CartProduct) => {
        price = price + product.count * product.price
      })
    setSum(price)
  }, [cart])

  return (
    <Container>
      <TitlePage>{t('User.CartPage.Title')}</TitlePage>
      {cart && cart.length > 0 ? (
        <Fragment>
          <TableContainer>
            <Table striped bordered hover responsive="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{t('User.CartPage.Table.Name')}</th>
                  <th>{t('User.CartPage.Table.Price')}</th>
                  <th>{t('User.CartPage.Table.Count')}</th>
                  <th>{t('User.CartPage.Table.Amount')}</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {cart.map((product, index) => {
                  return (
                    <tr key={product.productId}>
                      <td>{index + 1}</td>
                      <td>{product.name}</td>
                      <td>
                        <span className="font-weight-bold">{formatMoney(product.price)}</span>
                      </td>
                      <td>
                        <InputGroup>
                          <InputGroup.Prepend>
                            <Button
                              variant="outline-secondary"
                              onClick={(e: any) => handleChangeCart(e, product.productId, 'REMOVE', product.count)}>
                              -
                            </Button>
                          </InputGroup.Prepend>
                          <FormControl
                            readOnly={true}
                            value={product.count.toString()}
                            style={{ width: '50px', textAlign: 'center' }}
                          />
                          <InputGroup.Append>
                            <Button
                              variant="outline-secondary"
                              onClick={(e: any) => handleChangeCart(e, product.productId, 'ADD', product.count)}>
                              +
                            </Button>
                          </InputGroup.Append>
                        </InputGroup>
                      </td>
                      <td>
                        <span className="font-weight-bold">{formatMoney(product.count * product.price)}</span>
                      </td>
                      <td>
                        <Button
                          className="w-100"
                          variant="info"
                          onClick={(e: any) => handleChangeCart(e, product.productId, 'DELETE', product.count)}>
                          {t('User.CartPage.DeleteButton')}
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={6} className="text-right font-weight-bold">
                    {t('User.CartPage.Table.Amount')}: {formatMoney(sum)}
                  </td>
                </tr>
              </tfoot>
            </Table>
          </TableContainer>
          <div className="text-right">
            <Link to="/user/checkout">
              <Button>{t('User.CartPage.ToOrderButton')}</Button>
            </Link>
          </div>
        </Fragment>
      ) : (
        <p>{t('User.CartPage.EmptyProducts')}</p>
      )}
    </Container>
  )
}

export default UserCart
