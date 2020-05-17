export interface Notification {
  id: string
  date: Date
  variant: string
  title: string
  message: string
}

export interface NotificationId {
  id: string
}

export const ADD_NOTIFICATION = 'ADD_NOTIFICATION'
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION'

interface AddNotificationAction {
  type: typeof ADD_NOTIFICATION
  payload: Notification
}

interface RemoveNotificationAction {
  type: typeof REMOVE_NOTIFICATION
  payload: NotificationId
}

export type NotificationActionTypes = AddNotificationAction | RemoveNotificationAction
