import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addNotification } from '@Main/store/notifications/actions'
import { updateUser, loginUser } from '@Main/store/system/actions'
import { CompanyList } from '@Main/constants'
import { buildNotification } from '@Main/utils'
import { UserService } from '@Main/services'
import { useTranslation } from 'react-i18next'

export default function PageSignUp() {
  const { t } = useTranslation()
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
              addNotification(
                buildNotification('error', t('SignUpPage.Notifications.Error.Title'), data.errors[error].message),
              ),
            )
          })
        } else if (data.user) {
          dispatch(updateUser(data.user))
          const { token } = data
          dispatch(loginUser(token))
          localStorage.setItem('aut-token', token)
          dispatch(
            addNotification(
              buildNotification(
                'success',
                t('SignUpPage.Notifications.Success.Title'),
                t('SignUpPage.Notifications.Success.Description'),
              ),
            ),
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
          <h1 className="text-center">{t('SignUpPage.Title')}</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="userName">
              <Form.Label>{t('SignUpPage.Form.Name')}:</Form.Label>
              <Form.Control
                required={true}
                value={userData.name}
                name="name"
                data-testid="name"
                type="text"
                onChange={handleChange}
                placeholder={t('SignUpPage.Form.Name')}
              />
            </Form.Group>
            <Form.Group controlId="userEmail">
              <Form.Label>{t('SignUpPage.Form.Email')}:</Form.Label>
              <Form.Control
                required={true}
                value={userData.email}
                name="email"
                data-testid="email"
                type="email"
                onChange={handleChange}
                autoComplete="username"
                placeholder={t('SignUpPage.Form.Email')}
              />
            </Form.Group>
            <Form.Group controlId="userCompany">
              <Form.Label>{t('SignUpPage.Form.Company')}:</Form.Label>
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
              <Form.Label>{t('SignUpPage.Form.Password')}:</Form.Label>
              <Form.Control
                required={true}
                value={userData.password}
                name="password"
                data-testid="password"
                type="password"
                onChange={handleChange}
                autoComplete="current-password"
                placeholder={t('SignUpPage.Form.Password')}
              />
            </Form.Group>
            <Form.Group>
              <Button type="submit" className="w-100">
                {t('SignUpPage.Form.Submit')}
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
