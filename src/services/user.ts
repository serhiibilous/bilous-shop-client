import BaseService from '@Main/services/base'

export class UserService extends BaseService {
  getUser = async (id: string) => {
    return await this.getResource(`/admin/users/${id}`)
  }

  getCurrentUser = async () => {
    return await this.getResource(`/users/me`)
  }

  getUsers = async () => {
    return await this.getResource(`/admin/users/`)
  }

  updateUser = async (url: string, data: any) => {
    return await this.updateResource(url, data)
  }

  createUser = async (data: any) => {
    return await this.createResource('/users', data)
  }

  loginUser = async (data: any) => {
    return await this.createResource('/users/login', data)
  }

  logoutUser = async () => {
    return await this.emptyResource('/users/logout')
  }

  updateUserCart = async (data: any, id: string) => {
    return await this.updateResource(`/user/cart/product/${id}`, data)
  }
}
