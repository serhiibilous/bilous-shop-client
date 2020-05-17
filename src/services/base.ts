export default class BaseService {
  private readonly token: string | undefined

  constructor(token?: string) {
    this.token = token
  }

  getResource = async (url: string) => {
    const response = await fetch(`/api${url}`, {
      headers: {
        Authorization: this.token!,
      },
      method: 'GET',
    })
    return await response.json()
  }

  createUpdateFormDataResource = async (url: string, data: any, method: 'POST' | 'PATCH') => {
    const response = await fetch(`/api${url}`, {
      headers: {
        Authorization: this.token!,
      },
      method,
      body: data,
    })
    return await response.json()
  }

  updateResource = async (url: string, data: any) => {
    const response = await fetch(`/api${url}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.token!,
      },
      method: 'PATCH',
      body: JSON.stringify(data),
    })
    return await response.json()
  }

  createResource = async (url: string, data: any) => {
    const response = await fetch(`/api${url}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.token!,
      },
      method: 'POST',
      body: JSON.stringify(data),
    })
    return await response.json()
  }

  deleteResource = async (url: string) => {
    const response = await fetch(`/api${url}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.token!,
      },
      method: 'DELETE',
    })

    return await response.json()
  }

  emptyResource = async (url: string) => {
    return await fetch(`/api${url}`, {
      method: 'GET',
    })
  }
}
