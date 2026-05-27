import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger'
import { ColorsService } from './colors.service'
import { CreateColorDto } from './dto/create-color.dto'

@ApiTags('colors')
@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Cor criada com sucesso' })
  create(@Body() dto: CreateColorDto) {
    return this.colorsService.create(dto)
  }

  @Get()
  @ApiOkResponse({ description: 'Lista de cores retornada com sucesso' })
  findAll() {
    return this.colorsService.findAll()
  }

  @Get('active')
  @ApiOkResponse({ description: 'Lista de cores ativas retornada com sucesso' })
  findActive() {
    return this.colorsService.findActive()
  }

  @Patch(':id/toggle')
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ description: 'Cor atualizada com sucesso' })
  toggle(@Param('id', ParseIntPipe) id: number) {
    return this.colorsService.toggle(id)
  }
}
