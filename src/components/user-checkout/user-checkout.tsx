import React, { Fragment } from 'react'
import { Button, Container, Table, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { addNotification } from '@Main/store/notifications/actions'
import { updateUserCart } from '@Main/store/system/actions'
import { buildNotification, formatMoney } from '@Main/utils'
import { AppState } from '@Main/store'
import { CartProduct } from '@Main/types'
import { TableContainer, TitlePage } from './user-checkout-components'
import { OrderService } from '@Main/services'

export default function UserCheckout() {
  const dispatch = useDispatch()
  const { token, user } = useSelector((state: AppState) => state.system)
  const [products] = React.useState<CartProduct[]>(user!.cart)
  const [totalPrice, setTotalPrice] = React.useState(0)
  const [address] = React.useState<string>("вул. Фрунзе 4, 'Офіс RIA'")
  const [isOrderCreated, setIsOrderCreated] = React.useState<boolean>(false)
  const orderService = new OrderService(token!)

  function handleSubmitOrder() {
    orderService
      .createOrder({ products })
      .then(data => {
        if (data.errors) {
          dispatch(addNotification(buildNotification('error', 'Помилка!', data.errors.status.message)))
        } else {
          dispatch(updateUserCart([]))
          dispatch(
            addNotification(
              buildNotification('success', 'Замовлення оформлено!', "Очікуйте на доставку в офіс в п'ятницю о 16:00.")
            )
          )
          setIsOrderCreated(true)
        }
      })
      .catch(error => console.log(error))
  }

  React.useEffect(() => {
    let price = 0
    products.forEach((product: CartProduct) => {
      price = price + product.count * product.price
    })
    setTotalPrice(price)
  }, [products])

  return (
    <Container>
      {isOrderCreated ? <Redirect to="/user/orders" /> : null}
      <TitlePage>Замовлення</TitlePage>
      {products && (
        <Fragment>
          <TableContainer>
            <Table bordered hover responsive="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Назва</th>
                  <th>Ціна</th>
                  <th>Кількість</th>
                  <th>Сумма</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => {
                  return (
                    <tr key={product.productId}>
                      <td>{index + 1}</td>
                      <td>{product.name}</td>
                      <td>{product.price} грн.</td>
                      <td>{product.count}</td>
                      <td>{formatMoney(product.count * product.price)} грн.</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </TableContainer>
          <ListGroup className="mb-3">
            <ListGroup.Item>
              Компанія: <span className="font-weight-bold">{user!.company}</span>
            </ListGroup.Item>
            <ListGroup.Item>Адреса: {address}</ListGroup.Item>
            <ListGroup.Item>
              {products.length} {products.length > 1 ? 'товари' : 'товар'} на суму{' '}
              <span className="font-weight-bold">{formatMoney(totalPrice)}</span> грн.
            </ListGroup.Item>
            <ListGroup.Item>
              <div>
                До сплати <span className="font-weight-bold">{formatMoney(totalPrice)}</span> грн.
              </div>
              <div>
                Замовлення буде доставлено в п'ятницю о <span className="font-weight-bold">16:00</span>.
              </div>
            </ListGroup.Item>
          </ListGroup>
          <div className="text-right">
            <Button onClick={handleSubmitOrder}>Підтвердити замовлення</Button>
          </div>
        </Fragment>
      )}
    </Container>
  )
}
