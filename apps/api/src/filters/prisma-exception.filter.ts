import { type ArgumentsHost, Catch, type ExceptionFilter, HttpStatus } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import type { Response } from 'express'

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  private extractFieldFromP2002(
    exception: Prisma.PrismaClientKnownRequestError,
  ): string | undefined {
    const target = exception.meta?.target

    if (Array.isArray(target)) {
      return target[0]
    }

    if (typeof target === 'string') {
      const match = target.match(/_([^_]+)_key/)
      return match?.[1] ?? target
    }

    const message = exception.message
    const match = message.match(/Unique constraint failed on the fields?:\s*\(`(\w+)`\)/)
    if (match) {
      return match[1]
    }

    const fieldMatch = message.match(/`(\w+)`/)
    if (fieldMatch) {
      return fieldMatch[1]
    }

    return undefined
  }

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    if (exception.code === 'P2002') {
      const field = this.extractFieldFromP2002(exception)

      const fieldMessages: Record<string, string> = {
        cpf: 'Já existe um usuário cadastrado com este CPF',
        email: 'Já existe um usuário cadastrado com este e-mail',
      }

      const message = field
        ? (fieldMessages[field] ?? `Já existe um registro com este campo (${field})`)
        : 'Já existe um registro com estes dados'

      return response.status(HttpStatus.CONFLICT).json({
        statusCode: HttpStatus.CONFLICT,
        message,
        error: 'Conflict',
        field: field ?? null,
      })
    }

    if (exception.code === 'P2025') {
      return response.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Registro não encontrado',
        error: 'Not Found',
      })
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Erro interno do servidor',
      error: 'Internal Server Error',
    })
  }
}
