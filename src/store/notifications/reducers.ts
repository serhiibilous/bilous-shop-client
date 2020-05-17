import { Notification, NotificationActionTypes, ADD_NOTIFICATION, REMOVE_NOTIFICATION } from './types'

const initialState: Notification[] = []

export function notificationReducer(state = initialState, action: NotificationActionTypes): Notification[] {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return [...state, action.payload]
    case REMOVE_NOTIFICATION:
      return state.filter((item: Notification) => item.id !== action.payload.id)
    default:
      return state
  }
}
