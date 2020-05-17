import React from 'react'
import { useSelector } from 'react-redux'
import { Button, Row, Col, Form, Table } from 'react-bootstrap'
import { RenderOrderStatus, formatDateToDisplay, formatDateToCalendar, formatMoney } from '@Main/utils'
import { Container, TableContainer } from './admin-orders-components'
import { AppState } from '@Main/store'
import { Order } from '@Main/types'
import { OrderService } from '@Main/services'

export default function AdminOrders() {
  const { token } = useSelector((state: AppState) => state.system)
  const [orders, setOrders] = React.useState<Order[]>([])
  const [totalPrice, setTotalPrice] = React.useState(0)
  const [startDate, setStartDate] = React.useState(formatDateToCalendar(new Date(), -10))
  const [endDate, setEndDate] = React.useState(formatDateToCalendar(new Date()))
  const orderService = new OrderService(token!)

  function handleChangeStartDate(e: any) {
    setStartDate(formatDateToCalendar(new Date(e.target.value)))
  }

  function handleChangeEndDate(e: any) {
    setEndDate(formatDateToCalendar(new Date(e.target.value)))
  }

  function handleSearchOrders(e: any) {
    e.preventDefault()
    requestOrders()
  }

  function requestOrders() {
    orderService
      .getAdminOrders(`/admin/orders?startDate=${startDate}&endDate=${endDate}`)
      .then(data => {
        if (data.orders) {
          setOrders(data.orders)
        }
      })
      .catch(error => console.log(error))
  }

  React.useEffect(() => {
    requestOrders()
  }, [])

  React.useEffect(() => {
    let price: number = 0
    orders.forEach((order: any) => {
      price = price + order.totalPrice
    })
    setTotalPrice(price)
  }, [orders])

  return (
    <Container id="section-to-print">
      <h2>Filters</h2>
      <Form onSubmit={handleSearchOrders}>
        <Row className="align-items-end">
          <Col md={4} lg={3}>
            <Form.Group controlId="startDate">
              <Form.Label>Start date</Form.Label>
              <Form.Control type="date" placeholder="Start date" value={startDate} onChange={handleChangeStartDate} />
            </Form.Group>
          </Col>
          <Col md={4} lg={3}>
            <Form.Group controlId="endDate">
              <Form.Label>End date</Form.Label>
              <Form.Control type="date" placeholder="End date" value={endDate} onChange={handleChangeEndDate} />
            </Form.Group>
          </Col>
          <Col md={4} lg={3}>
            <Form.Group>
              <Button className="w-100" type="submit">
                Знайти ордера
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <h1>Orders</h1>
      {orders.length > 0 ? (
        <TableContainer>
          <Table bordered striped responsive="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Імя</th>
                <th>Компанія</th>
                <th>Дата</th>
                <th>Статус</th>
                <th>Продукти</th>
                <th>Сумма</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => {
                return (
                  <tr key={order._id}>
                    <td>{index + 1}</td>
                    <td className="text-nowrap">{order.user.name}</td>
                    <td>{order.user.company}</td>
                    <td className="text-nowrap">{formatDateToDisplay(order.createdAt.toString())}</td>
                    <td>
                      <h5>{RenderOrderStatus(order.status)}</h5>
                    </td>
                    <td>
                      <ul>
                        {order.products.map(product => {
                          return (
                            <li key={product.productId}>
                              {product.count} шт. {product.name} - {formatMoney(product.count * product.price)} грн.
                            </li>
                          )
                        })}
                      </ul>
                    </td>
                    <td>{formatMoney(order.totalPrice)} грн.</td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={6} className="text-right font-weight-bold">
                  Загальна сумма:
                </td>
                <td className="font-weight-bold text-nowrap">{formatMoney(totalPrice)} грн.</td>
              </tr>
            </tfoot>
          </Table>
        </TableContainer>
      ) : (
        <div>Немає ордерів.</div>
      )}
    </Container>
  )
}
