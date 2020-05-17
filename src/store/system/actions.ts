import { UserLoggedToken, SET_USER_DATA, LOGIN_USER, LOGOUT_USER, UPDATE_USER_CART, SystemActionTypes } from './types'
import { User, CartProduct } from '@Main/types'

export function updateUser(user: User | null): SystemActionTypes {
  return {
    type: SET_USER_DATA,
    payload: user,
  }
}

export function loginUser(token: UserLoggedToken): SystemActionTypes {
  return {
    type: LOGIN_USER,
    payload: token,
  }
}

export function logoutUser(): SystemActionTypes {
  return {
    type: LOGOUT_USER,
  }
}

export function updateUserCart(cartProducts: CartProduct[]): SystemActionTypes {
  return {
    type: UPDATE_USER_CART,
    payload: cartProducts,
  }
}
