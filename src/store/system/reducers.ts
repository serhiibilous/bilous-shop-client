import { SystemState, SET_USER_DATA, LOGIN_USER, LOGOUT_USER, UPDATE_USER_CART, SystemActionTypes } from './types'

const initialState: SystemState = {
  loggedIn: false,
  token: '',
  user: null,
}

export function systemReducer(state = initialState, action: SystemActionTypes): SystemState {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, user: action.payload }
    case LOGIN_USER:
      return { ...state, token: action.payload.token, loggedIn: true }
    case LOGOUT_USER:
      return { ...state, token: null, loggedIn: false }
    case UPDATE_USER_CART:
      return { ...state, user: { ...state.user, cart: action.payload } } as SystemState
    default:
      return state
  }
}
