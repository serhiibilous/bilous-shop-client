import React from 'react'
import { useSelector } from 'react-redux'
import { Button, Row, Col, Form, Table, Container } from 'react-bootstrap'
import { RenderOrderStatus, formatDateToDisplay, formatDateToCalendar, formatMoney } from '@Main/utils'
import { AppState } from '@Main/store'
import { Order } from '@Main/types'
import { OrderService } from '@Main/services'
import { useTranslation } from 'react-i18next'
import { TableContainer, PageTitle, PageDescription } from '@Main/styles/admin'

export default function AdminOrders() {
  const { t } = useTranslation()
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
      .then((data) => {
        if (data.orders) {
          setOrders(data.orders)
        }
      })
      .catch((error) => console.log(error))
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
      <Form onSubmit={handleSearchOrders}>
        <Row className="align-items-end">
          <Col md={4} lg={3}>
            <Form.Group controlId="startDate">
              <Form.Label>{t('Admin.OrdersPage.Form.StartDate')}</Form.Label>
              <Form.Control
                type="date"
                placeholder={t('Admin.OrdersPage.Form.StartDate')}
                value={startDate}
                onChange={handleChangeStartDate}
              />
            </Form.Group>
          </Col>
          <Col md={4} lg={3}>
            <Form.Group controlId="endDate">
              <Form.Label>{t('Admin.OrdersPage.Form.EndDate')}</Form.Label>
              <Form.Control
                type="date"
                placeholder={t('Admin.OrdersPage.Form.EndDate')}
                value={endDate}
                onChange={handleChangeEndDate}
              />
            </Form.Group>
          </Col>
          <Col md={4} lg={3}>
            <Form.Group>
              <Button className="w-100" type="submit">
                {t('Admin.OrdersPage.Form.Submit')}
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <PageTitle>{t('Admin.OrdersPage.Title')}</PageTitle>
      {orders.length > 0 ? (
        <TableContainer>
          <Table bordered striped responsive="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>{t('Admin.OrdersPage.Table.Name')}</th>
                <th>{t('Admin.OrdersPage.Table.Company')}</th>
                <th>{t('Admin.OrdersPage.Table.Date')}</th>
                <th>{t('Admin.OrdersPage.Table.Status')}</th>
                <th>{t('Admin.OrdersPage.Table.Products')}</th>
                <th>{t('Admin.OrdersPage.Table.Amount')}</th>
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
                        {order.products.map((product) => {
                          return (
                            <li key={product.productId}>
                              {product.count}-x - {product.name} - {formatMoney(product.count * product.price)}
                            </li>
                          )
                        })}
                      </ul>
                    </td>
                    <td>{formatMoney(order.totalPrice)}</td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={6} className="text-right font-weight-bold">
                  {t('Admin.OrdersPage.Table.Total')}
                </td>
                <td className="font-weight-bold text-nowrap">{formatMoney(totalPrice)}</td>
              </tr>
            </tfoot>
          </Table>
        </TableContainer>
      ) : (
        <PageDescription>{t('Admin.OrdersPage.EmptySearch')}</PageDescription>
      )}
    </Container>
  )
}
