import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import type { CreateColorDto } from './dto/create-color.dto'

@Injectable()
export class ColorsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateColorDto) {
    return this.prisma.color.create({
      data: {
        name: dto.name,
        hex: dto.hex,
        active: dto.active ?? true,
      },
    })
  }

  findAll() {
    return this.prisma.color.findMany({
      orderBy: { id: 'asc' },
    })
  }

  findActive() {
    return this.prisma.color.findMany({
      where: { active: true },
      orderBy: { id: 'asc' },
    })
  }

  async toggle(id: number) {
    const color = await this.prisma.color.findUnique({ where: { id } })
    if (!color) return null
    return this.prisma.color.update({
      where: { id },
      data: { active: !color.active },
    })
  }
}
