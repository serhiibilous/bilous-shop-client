import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Toast } from 'react-bootstrap'
import { formatDateToDisplay } from '@Main/utils'
import { removeNotification } from '@Main/store/notifications/actions'
import { Container, ToastContainer } from './notifications-components'
import { AppState } from '@Main/store'
import { Notification } from '@Main/store/notifications/types'

export default function Notifications() {
  const dispatch = useDispatch()
  const { notifications } = useSelector((state: AppState) => state)
  const [notificationsList, setNotificationsList] = React.useState<Notification[]>([])

  function handleRemoveNotification(id: string) {
    dispatch(removeNotification({ id }))
  }

  React.useEffect(() => {
    setNotificationsList(notifications)
  }, [notifications])

  return (
    <Container>
      {notificationsList.length > 0 &&
        notificationsList.map(notification => {
          return (
            <ToastContainer
              key={notification.id}
              onClose={() => handleRemoveNotification(notification.id)}
              variant={notification.variant}>
              <Toast.Header>
                <strong className="mr-auto">{notification.title}</strong>
                <small>{formatDateToDisplay(notification.date.toString())}</small>
              </Toast.Header>
              <Toast.Body>{notification.message}</Toast.Body>
            </ToastContainer>
          )
        })}
    </Container>
  )
}
