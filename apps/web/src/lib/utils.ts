import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function maskCPF(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  return digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

export function unmaskCPF(value: string): string {
  return value.replace(/\D/g, '')
}

export function isValidCPF(cpf: string): boolean {
  const digits = cpf.replace(/\D/g, '')
  if (digits.length !== 11) return false
  if (/^(\d)\1{10}$/.test(digits)) return false

  const calcCheck = (slice: string, factor: number) => {
    let sum = 0
    for (let i = 0; i < slice.length; i++) {
      sum += Number(slice[i]) * (factor - i)
    }
    const rem = (sum * 10) % 11
    return rem === 10 ? 0 : rem
  }

  const firstCheck = calcCheck(digits.slice(0, 9), 10)
  if (firstCheck !== Number(digits[9])) return false

  const secondCheck = calcCheck(digits.slice(0, 10), 11)
  if (secondCheck !== Number(digits[10])) return false

  return true
}
