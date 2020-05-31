export interface Product {
  _id: string
  name: string
  description: string
  price: number
  oldPrice: number
  image: string
  category: {
    name: string
    id: string
  }
}

export interface GroupedProduct {
  _id: string
  products: Product[]
}
