import React from 'react'
import { useDispatch } from 'react-redux'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { updateUser, loginUser } from '@Main/store/system/actions'
import { addNotification } from '@Main/store/notifications/actions'
import { buildNotification } from '@Main/utils'
import { UserService } from '@Main/services'
import { useTranslation } from 'react-i18next'
import { PublicPageContainer } from '@Main/components'

export default function PageLogin() {
  const { t } = useTranslation()
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
      .loginUser(userData)
      .then((data) => {
        if (data.user) {
          const token = data.token
          localStorage.setItem('aut-token', token)
          dispatch(updateUser(data.user))
          dispatch(loginUser({ token }))
          dispatch(
            addNotification(
              buildNotification(
                'success',
                t('LoginPage.Notification.LoggedIn.Title'),
                t('LoginPage.Notification.LoggedIn.Content'),
              ),
            ),
          )
        }
      })
      .catch((error) => console.log(error))
  }

  return (
    <PublicPageContainer>
      <Container>
        <Row className="justify-content-center">
          <Col sm={6} md={6} lg={4} xl={4}>
            <br />
            <h1 className="text-center">{t('LoginPage.Title')}</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="userEmail">
                <Form.Label>{t('LoginPage.Form.Email')}:</Form.Label>
                <Form.Control
                  required={true}
                  value={userData.email}
                  name="email"
                  type="email"
                  data-testid="email"
                  onChange={handleChange}
                  autoComplete="username"
                  placeholder={t('LoginPage.Form.Email')}
                />
              </Form.Group>
              <Form.Group controlId="userPassword">
                <Form.Label>{t('LoginPage.Form.Password')}:</Form.Label>
                <Form.Control
                  required={true}
                  value={userData.password}
                  name="password"
                  type="password"
                  data-testid="password"
                  onChange={handleChange}
                  autoComplete="current-password"
                  placeholder={t('LoginPage.Form.Password')}
                />
              </Form.Group>
              <Form.Group>
                <Button type="submit" data-test-id="submit" className="w-100">
                  {t('LoginPage.Form.Submit')}
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </PublicPageContainer>
  )
}
