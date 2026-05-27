const API_URL = process.env.NEXT_PUBLIC_API_URL

type RequestMethod = 'GET' | 'POST'

export interface ApiError {
  statusCode: number
  message: string
  error: string
  field: string | null
}

const request =
  (method: RequestMethod) =>
  async <T>(endpoint: string, init?: RequestInit): Promise<T> => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...init,
      method,
      headers: {
        ...init?.headers,
      },
    })

    if (!response.ok) {
      const error: ApiError = await response.json()
      throw error?.message ?? error
    }

    return response.json()
  }

export const api = {
  GET: request('GET'),
  POST: request('POST'),
}
