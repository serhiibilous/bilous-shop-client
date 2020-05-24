import React from 'react'
import { Container, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RenderOrderStatus, formatDateToDisplay, formatMoney } from '@Main/utils'
import { TableContainer, TitlePage } from './user-orders-components'
import { AppState } from '@Main/store'
import { Order } from '@Main/types'
import { OrderService } from '@Main/services'
import { useTranslation } from 'react-i18next'

export default function UserOrders() {
  const { t } = useTranslation()
  const { token } = useSelector((state: AppState) => state.system)
  const [orders, setOrders] = React.useState<Order[]>([])
  const orderService = new OrderService(token!)

  React.useEffect(() => {
    orderService
      .getUserOrders()
      .then((data) => {
        if (data) setOrders(data.orders)
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <Container>
      <TitlePage>{t('User.OrdersPage.Title')}</TitlePage>
      {orders.length > 0 ? (
        <TableContainer>
          <Table bordered responsive="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>{t('User.OrdersPage.Table.Status')}</th>
                <th>{t('User.OrdersPage.Table.Date')}</th>
                <th>{t('User.OrdersPage.Table.Products')}</th>
                <th>{t('User.OrdersPage.Table.Amount')}</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => {
                return (
                  <tr key={order._id}>
                    <td>{index + 1}</td>
                    <td>
                      <h5>{RenderOrderStatus(order.status)}</h5>
                    </td>
                    <td className="text-nowrap font-italic">{formatDateToDisplay(order.createdAt.toString())}</td>
                    <td>
                      <ul>
                        {order.products.map((product) => {
                          return (
                            <li key={product.productId}>
                              {product.count}-x {product.name} - {formatMoney(product.count * product.price)}
                            </li>
                          )
                        })}
                      </ul>
                    </td>
                    <td>
                      <span className="font-weight-bold">{formatMoney(order.totalPrice)}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </TableContainer>
      ) : (
        <div>{t('User.OrdersPage.EmptyOrders')}</div>
      )}
    </Container>
  )
}
