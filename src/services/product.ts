import BaseService from '@Main/services/base'

export class ProductService extends BaseService {
  getProducts = async (url: string) => {
    return await this.getResource(url)
  }

  createProduct = async (data: any) => {
    return await this.createResource('/user/order/create', data)
  }

  getProduct = async (id: string) => {
    return await this.getResource(`/product/${id}`)
  }

  deleteProduct = async (id: string) => {
    return await this.deleteResource(`/product/${id}`)
  }
}
