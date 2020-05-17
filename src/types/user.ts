import { CartProduct } from '@Main/types'

export enum Role {
  User = 'user',
  Admin = 'admin',
}

export interface UserData {
  age: number
  email: string
  name: string
  password: string
}

export interface User {
  _id: string
  age: number
  cart: CartProduct[]
  company: string
  email: string
  name: string
  role: Role
  createdAt: Date
  updatedAt: Date
}
