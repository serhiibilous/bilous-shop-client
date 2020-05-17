import BaseService from '@Main/services/base'

export class OrderService extends BaseService {
  getUserOrders = async () => {
    return await this.getResource(`/user/orders`)
  }

  getAdminOrders = async (url: string) => {
    return await this.getResource(url)
  }

  createOrder = async (data: any) => {
    return await this.createResource('/user/order/create', data)
  }

  updateAdminOrder = async (id: string, data: any) => {
    return await this.updateResource(`/admin/orders/${id}`, data)
  }
}
