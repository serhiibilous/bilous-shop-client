import { combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { notificationReducer } from './notifications/reducers'
import { Notification } from './notifications/types'
import { SystemState } from './system/types'
import { systemReducer } from './system/reducers'

export interface AppState {
  notifications: Notification[]
  system: SystemState
}

const rootReducer = combineReducers<AppState>({
  notifications: notificationReducer,
  system: systemReducer,
})

export const store = createStore(rootReducer, {}, composeWithDevTools())
