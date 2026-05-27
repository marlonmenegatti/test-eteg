import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import type { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        fullName: dto.fullName,
        cpf: dto.cpf,
        email: dto.email,
        favoriteColorId: dto.favoriteColorId,
        notes: dto.notes,
      },
      include: {
        favoriteColor: true,
      },
    })
  }
}
