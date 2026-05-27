import { api } from './client'

export interface CreateUserPayload {
  fullName: string
  cpf: string
  email: string
  favoriteColorId: number
  notes?: string
}

export async function createUser(payload: CreateUserPayload): Promise<unknown> {
  await api.POST('/users', {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  return true
}
