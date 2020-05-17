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

function UserCart() {
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
      .then(data => {
        if (data.products) {
          setCart(data.products)
          dispatch(updateUserCart(data.products))
        }
      })
      .catch(error => console.log(error))
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
      <TitlePage>Кошик</TitlePage>
      {cart && cart.length > 0 ? (
        <Fragment>
          <TableContainer>
            <Table striped bordered hover responsive="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Назва</th>
                  <th>Ціна</th>
                  <th>Кількість</th>
                  <th>Сумма</th>
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
                        <span className="font-weight-bold">{product.price}</span> грн.
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
                        <span className="font-weight-bold">{formatMoney(product.count * product.price)}</span> грн.
                      </td>
                      <td>
                        <Button
                          className="w-100"
                          variant="info"
                          onClick={(e: any) => handleChangeCart(e, product.productId, 'DELETE', product.count)}>
                          Видалити
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={6} className="text-right font-weight-bold">
                    Сумма: {formatMoney(sum)} грн.
                  </td>
                </tr>
              </tfoot>
            </Table>
          </TableContainer>
          <div className="text-right">
            <Link to="/user/checkout">
              <Button>Оформити замовлення</Button>
            </Link>
          </div>
        </Fragment>
      ) : (
        <p>У вас немає товарів.</p>
      )}
    </Container>
  )
}

export default UserCart
