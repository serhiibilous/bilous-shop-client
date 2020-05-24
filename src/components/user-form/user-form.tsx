import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '@Main/store/system/actions'
import { addNotification } from '@Main/store/notifications/actions'
import { Button, Form } from 'react-bootstrap'
import { buildNotification } from '@Main/utils'
import { AppState } from '@Main/store'
import { UserService } from '@Main/services'
import { UserData } from '@Main/types'
import { useTranslation } from 'react-i18next'

export default function UserForm({ userId }: any) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { token, user } = useSelector((state: AppState) => state.system)
  const userService = new UserService(token!)
  const [userData, setUserData] = useState<UserData>({
    password: '',
    name: user!.name,
    email: user!.email,
    age: user!.age,
  })

  function handleChange(event: any) {
    const target = event.target
    const name = target.name
    setUserData({ ...userData, [name]: target.value })
  }

  function handleSubmit(e: any) {
    e.preventDefault()
    const URL: string = !userId ? '/users/me' : `/admin/users/${userId}`
    userService.updateUser(URL, userData).then(
      (data) => {
        if (data.user) {
          if (!userId) {
            dispatch(updateUser(data))
            dispatch(
              addNotification(
                buildNotification(
                  'success',
                  t('User.Notifications.Success.Title'),
                  t('User.Notifications.Success.Description'),
                ),
              ),
            )
          } else {
            dispatch(
              addNotification(
                buildNotification(
                  'success',
                  t('User.Notifications.Success.Title'),
                  t('User.Notifications.Success.Description', { name: data.user.name }),
                ),
              ),
            )
          }
          setUserData({ ...userData, password: '' })
        } else if (data.errors) {
          Object.keys(data.errors).map((error) => {
            return dispatch(
              addNotification(
                buildNotification('error', t('User.Notifications.ValidationError.Title'), data.errors[error].message),
              ),
            )
          })
        } else if (data.error) {
          dispatch(addNotification(buildNotification('error', t('User.Notifications.CommonError.Title'), data.error)))
        }
      },
      (error) => {
        console.log(error)
      },
    )
  }

  React.useEffect(() => {
    if (userId) {
      userService
        .getUser(userId)
        .then((data) => {
          if (data.user) {
            setUserData({ ...userData, name: data.user.name, age: data.user.age, email: data.user.email })
          }
        })
        .catch((error) => console.log(error))
    }
  }, [])

  return (
    <Fragment>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="userName">
          <Form.Label>{t('User.Form.Name')}:</Form.Label>
          <Form.Control
            value={userData.name}
            type="text"
            placeholder={t('User.Form.Name')}
            name="name"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="userAge">
          <Form.Label>{t('User.Form.Age')}:</Form.Label>
          <Form.Control
            value={userData.age.toString()}
            min="0"
            max="100"
            type="number"
            placeholder={t('User.Form.Age')}
            name="age"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="userEmail">
          <Form.Label>{t('User.Form.Email')}:</Form.Label>
          <Form.Control
            value={userData.email}
            type="email"
            placeholder={t('User.Form.Email')}
            name="email"
            onChange={handleChange}
            autoComplete="username"
          />
        </Form.Group>
        <Form.Group controlId="userPassword">
          <Form.Label>{t('User.Form.Password')}:</Form.Label>
          <Form.Control
            value={userData.password}
            type="password"
            placeholder={t('User.Form.Password')}
            name="password"
            onChange={handleChange}
            autoComplete="current-password"
          />
        </Form.Group>
        <Form.Group>
          <Button type="submit">{t('User.Form.Submit')}</Button>
        </Form.Group>
      </Form>
    </Fragment>
  )
}
