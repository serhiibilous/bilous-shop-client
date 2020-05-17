import { User, CartProduct } from '@Main/types'

export interface SystemState {
  loggedIn: boolean
  token: string | null
  user: User | null
}

export interface UserLoggedToken {
  token: string
}

export const SET_USER_DATA = 'SET_USER_DATA'
export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'
export const UPDATE_USER_CART = 'UPDATE_USER_CART'

interface UpdateUserAction {
  type: typeof SET_USER_DATA
  payload: User | null
}

interface LoginUserAction {
  type: typeof LOGIN_USER
  payload: UserLoggedToken
}

interface LogoutUserAction {
  type: typeof LOGOUT_USER
}

interface UpdateUserCartAction {
  type: typeof UPDATE_USER_CART
  payload: CartProduct[]
}

export type SystemActionTypes = UpdateUserAction | LoginUserAction | LogoutUserAction | UpdateUserCartAction
