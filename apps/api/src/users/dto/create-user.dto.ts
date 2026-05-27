import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  registerDecorator,
  type ValidationArguments,
  type ValidationOptions,
} from 'class-validator'

function isValidCPF(cpf: string): boolean {
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

function IsCPF(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isCPF',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: string, _args: ValidationArguments) {
          return typeof value === 'string' && isValidCPF(value)
        },
        defaultMessage() {
          return 'CPF inválido'
        },
      },
    })
  }
}

export class CreateUserDto {
  @ApiProperty({ example: 'João da Silva' })
  @IsString({ message: 'O campo nome é obrigatorio' })
  @IsNotEmpty({ message: 'O campo nome é obrigatorio' })
  fullName!: string

  @ApiProperty({ example: '12345678909' })
  @IsString({ message: 'O campo cpf é obrigatorio' })
  @IsNotEmpty({ message: 'O campo cpf é obrigatorio' })
  @IsCPF({ message: 'CPF inválido' })
  cpf!: string

  @ApiProperty({ example: 'joao@email.com' })
  @IsEmail({}, { message: 'O campo email deve ser um email válido' })
  @IsNotEmpty({ message: 'O campo email é obrigatorio' })
  email!: string

  @ApiProperty({ example: 1 })
  @IsInt({ message: 'O campo cor é obrigatorio' })
  @IsNotEmpty({ message: 'O campo cor é obrigatorio' })
  favoriteColorId!: number

  @ApiPropertyOptional({ example: 'Observações opcionais' })
  @IsOptional()
  @IsString({ message: 'O campo observações deve ser um texto' })
  notes?: string
}
