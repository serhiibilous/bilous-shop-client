import React from 'react'
import { useDispatch } from 'react-redux'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { updateUser, loginUser } from '@Main/store/system/actions'
import { addNotification } from '@Main/store/notifications/actions'
import { buildNotification } from '@Main/utils'
import { UserService } from '@Main/services'

export default function PageLogin() {
  const dispatch = useDispatch()
  const userService = new UserService()
  const [userData, setUserData] = React.useState({ email: 'admin@gmail.com', password: 'Admin1234' })

  function handleChange(event: any) {
    const target = event.target
    const name = target.name
    setUserData({ ...userData, [name]: target.value })
  }

  function handleSubmit(e: any) {
    e.preventDefault()
    userService
      .loginUser('/users/login', userData)
      .then(data => {
        if (!data.error) {
          const token = data.token
          localStorage.setItem('aut-token', token)
          dispatch(updateUser(data.user))
          dispatch(loginUser({ token }))
          dispatch(addNotification(buildNotification('success', 'Вітаємо Вас', 'Ви успішно увійшли на сайт.')))
        } else {
          console.log(data.error)
        }
      })
      .catch(error => console.log(error))
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm={6} md={6} lg={4} xl={4}>
          <br />
          <h1 className="text-center">Логін</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="userEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                required={true}
                value={userData.email}
                name="email"
                type="email"
                onChange={handleChange}
                autoComplete="username"
                placeholder="Email"
              />
            </Form.Group>
            <Form.Group controlId="userPassword">
              <Form.Label>Пароль:</Form.Label>
              <Form.Control
                required={true}
                value={userData.password}
                name="password"
                type="password"
                onChange={handleChange}
                autoComplete="current-password"
                placeholder="Пароль"
              />
            </Form.Group>
            <Form.Group>
              <Button type="submit" className="w-100">
                Увійти
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
