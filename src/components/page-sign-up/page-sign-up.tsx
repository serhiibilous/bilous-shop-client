import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addNotification } from '@Main/store/notifications/actions'
import { updateUser, loginUser } from '@Main/store/system/actions'
import { CompanyList } from '@Main/constants'
import { buildNotification } from '@Main/utils'
import { UserService } from '@Main/services'

export default function PageSignUp() {
  const dispatch = useDispatch()
  const userService = new UserService()
  const [userData, setUserData] = React.useState({ name: '', email: '', company: 'RIA', password: '' })

  function handleChange(event: any) {
    const target = event.target
    const name = target.name
    setUserData({ ...userData, [name]: target.value })
  }

  function handleSubmit(e: any) {
    e.preventDefault()
    userService
      .createUser(userData)
      .then((data) => {
        if (data.errors) {
          Object.keys(data.errors).map((error) => {
            return dispatch(
              addNotification(buildNotification('error', 'Помилка валідації', data.errors[error].message)),
            )
          })
        } else if (data.user) {
          dispatch(updateUser(data.user))
          const { token } = data
          dispatch(loginUser(token))
          localStorage.setItem('aut-token', token)
          dispatch(
            addNotification(buildNotification('success', 'Успішна реєстрація!', 'Тепер ви можете робити замовлення!')),
          )
        }
      })
      .catch((error) => console.log(error))
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm={6} md={6} lg={4} xl={4}>
          <br />
          <h1 className="text-center">Реєстрація</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="userName">
              <Form.Label>Ім'я:</Form.Label>
              <Form.Control
                required={true}
                value={userData.name}
                name="name"
                data-testid="name"
                type="text"
                onChange={handleChange}
                placeholder="Ім'я"
              />
            </Form.Group>
            <Form.Group controlId="userEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                required={true}
                value={userData.email}
                name="email"
                data-testid="email"
                type="email"
                onChange={handleChange}
                autoComplete="username"
                placeholder="Email"
              />
            </Form.Group>
            <Form.Group controlId="userCompany">
              <Form.Label>Компанія:</Form.Label>
              <Form.Control required={true} value={userData.company} name="company" onChange={handleChange} as="select">
                {CompanyList.map((companyName: string) => {
                  return (
                    <option key={companyName} value={companyName}>
                      {companyName}
                    </option>
                  )
                })}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="userPassword">
              <Form.Label>Пароль:</Form.Label>
              <Form.Control
                required={true}
                value={userData.password}
                name="password"
                data-testid="password"
                type="password"
                onChange={handleChange}
                autoComplete="current-password"
                placeholder="Пароль"
              />
            </Form.Group>
            <Form.Group>
              <Button type="submit" className="w-100">
                Зареєструватись
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
