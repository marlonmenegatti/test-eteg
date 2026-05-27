const API_BASE_URL = import.meta.env.VITE_API_URL

export interface Color {
  id: number
  name: string
  hex: string
  active: boolean
}

export interface CreateUserPayload {
  fullName: string
  cpf: string
  email: string
  favoriteColorId: number
  notes?: string
}

export interface ApiError {
  statusCode: number
  message: string
  error: string
  field: string | null
}

export async function fetchActiveColors(): Promise<Color[]> {
  const response = await fetch(`${API_BASE_URL}/colors/active`)
  if (!response.ok) {
    throw new Error('Erro ao buscar cores')
  }
  return response.json()
}

export async function createUser(payload: CreateUserPayload): Promise<unknown> {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const error: ApiError = await response.json()
    throw error
  }

  return response.json()
}
