import BaseService from '@Main/services/base'

export class CategoryService extends BaseService {
  getCategories = async () => {
    return await this.getResource(`/categories`)
  }

  getCategory = async (id: string) => {
    return await this.getResource(`/categories/${id}`)
  }

  createCategory = async (data: any) => {
    return await this.createResource('/categories', data)
  }

  updateCategory = async (id: string, data: any) => {
    return await this.updateResource(`/categories/${id}`, data)
  }

  deleteCategory = async (id: string) => {
    return await this.deleteResource(`/categories/${id}`)
  }
}
