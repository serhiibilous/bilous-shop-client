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
import { useTranslation } from 'react-i18next'

export default function UserCheckout() {
  const { t } = useTranslation()
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
      .then((data) => {
        if (data.errors) {
          dispatch(
            addNotification(
              buildNotification('error', t('User.OrderPage.Notification.ErrorOrder.Title'), data.errors.status.message),
            ),
          )
        } else {
          dispatch(updateUserCart([]))
          dispatch(
            addNotification(
              buildNotification(
                'success',
                t('User.OrderPage.Notification.CreatedOrder.Title'),
                t('User.OrderPage.Notification.CreatedOrder.Description'),
              ),
            ),
          )
          setIsOrderCreated(true)
        }
      })
      .catch((error) => console.log(error))
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
      <TitlePage>{t('User.OrderPage.Title')}</TitlePage>
      {products && (
        <Fragment>
          <TableContainer>
            <Table bordered hover responsive="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{t('User.OrderPage.Table.Name')}</th>
                  <th>{t('User.OrderPage.Table.Price')}</th>
                  <th>{t('User.OrderPage.Table.Count')}</th>
                  <th>{t('User.OrderPage.Table.Amount')}</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => {
                  return (
                    <tr key={product.productId}>
                      <td>{index + 1}</td>
                      <td>{product.name}</td>
                      <td>{formatMoney(product.price)}</td>
                      <td>{product.count}</td>
                      <td>{formatMoney(product.count * product.price)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </TableContainer>
          <ListGroup className="mb-3">
            <ListGroup.Item>
              {t('User.OrderPage.Information.Company')}: <span className="font-weight-bold">{user!.company}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              {t('User.OrderPage.Information.Address')}: {address}
            </ListGroup.Item>
            <ListGroup.Item>
              {products.length}{' '}
              {products.length > 1
                ? t('User.OrderPage.Information.ProductsCount_plural')
                : t('User.OrderPage.Information.ProductsCount')}
              <span className="font-weight-bold">{formatMoney(totalPrice)}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <div>
                {t('User.OrderPage.Information.ToBePaid')}{' '}
                <span className="font-weight-bold">{formatMoney(totalPrice)}</span> 
              </div>
              <div>
                {t('User.OrderPage.Information.DeliverTime')} <span className="font-weight-bold">16:00</span>
              </div>
            </ListGroup.Item>
          </ListGroup>
          <div className="text-right">
            <Button onClick={handleSubmitOrder}>{t('User.OrderPage.ButtonSubmit')}</Button>
          </div>
        </Fragment>
      )}
    </Container>
  )
}
