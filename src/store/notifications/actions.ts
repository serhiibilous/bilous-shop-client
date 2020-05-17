import { Notification, NotificationId, ADD_NOTIFICATION, REMOVE_NOTIFICATION, NotificationActionTypes } from './types'

export function addNotification(notification: Notification): NotificationActionTypes {
  return {
    type: ADD_NOTIFICATION,
    payload: notification,
  }
}

export function removeNotification(id: NotificationId): NotificationActionTypes {
  return {
    type: REMOVE_NOTIFICATION,
    payload: id,
  }
}
