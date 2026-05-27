import { api } from './client'

export type Color = {
  id: number
  name: string
  hex: string
}

export type Colors = Array<Color>

export async function getColors() {
  const result = await api.GET<Colors>('/colors/active', { method: 'GET' })
  return result
}
