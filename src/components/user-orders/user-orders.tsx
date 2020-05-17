import React from 'react'
import { Container, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RenderOrderStatus, formatDateToDisplay, formatMoney } from '@Main/utils'
import { TableContainer, TitlePage } from './user-orders-components'
import { AppState } from '@Main/store'
import { Order } from '@Main/types'
import { OrderService } from '@Main/services'

export default function UserOrders() {
  const { token } = useSelector((state: AppState) => state.system)
  const [orders, setOrders] = React.useState<Order[]>([])
  const orderService = new OrderService(token!)

  React.useEffect(() => {
    orderService
      .getUserOrders()
      .then(data => {
        if (data) setOrders(data.orders)
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <Container>
      <TitlePage>Замовлення</TitlePage>
      {orders.length > 0 ? (
        <TableContainer>
          <Table bordered responsive="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Статус</th>
                <th>Дата</th>
                <th>Продукти</th>
                <th>Сумма</th>
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
                        {order.products.map(product => {
                          return (
                            <li key={product.productId}>
                              {product.count} шт. {product.name} - {product.count * product.price} грн.
                            </li>
                          )
                        })}
                      </ul>
                    </td>
                    <td>
                      <span className="font-weight-bold">{formatMoney(order.totalPrice)}</span> грн.
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </TableContainer>
      ) : (
        <div>У вас поки що немає замовлень.</div>
      )}
    </Container>
  )
}
