const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001'

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: unknown
  headers?: Record<string, string>
}

class ApiService {
  private token: string | null = null

  constructor() {
    this.token = localStorage.getItem('token')
  }

  setToken(token: string) {
    this.token = token
    localStorage.setItem('token', token)
  }

  clearToken() {
    this.token = null
    localStorage.removeItem('token')
  }

  private async request<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
    const prefix = '/api'
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }

    const response = await fetch(`${API_URL}${prefix}${endpoint}`, {
      method: options.method || 'GET',
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    })

    if (response.status === 401) {
      this.clearToken()

      let message = 'Unauthorized'

      try {
        const error = await response.json()
        message = error?.message || message
      } catch {}

      const err = new Error(message) as any
      err.status = 401
      throw err
    }

    if (!response.ok) {
      let errorMessage = 'Request failed'
      let errorData: any = null

      try {
        const error = await response.json()
        errorMessage = error?.message || errorMessage
        errorData = error?.data || null //capture validation errors
      } catch {}

      const err = new Error(errorMessage) as any
      err.status = response.status
      err.data = errorData //attach validation errors

      throw err
    }

    return response.json()
  }

  get<T>(endpoint: string) {
    return this.request<T>(endpoint)
  }

  post<T>(endpoint: string, body: unknown) {
    return this.request<T>(endpoint, { method: 'POST', body })
  }

  put<T>(endpoint: string, body: unknown) {
    return this.request<T>(endpoint, { method: 'PUT', body })
  }

  delete<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

export const api = new ApiService()