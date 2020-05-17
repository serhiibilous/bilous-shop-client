interface Product {
  productId: string
  name: string
  price: number
  count: number
}

interface User {
  name: string
  company: string
}

export interface Order {
  _id: string
  products: Product[]
  totalPrice: number
  company: string
  address: string
  status: string
  owner: string
  user: User
  createdAt: Date
  updatedAt: Date
}
