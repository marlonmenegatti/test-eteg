import { Body, Controller, Post } from '@nestjs/common'
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from './dto/create-user.dto'
import { UsersService } from './users.service'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Usuário criado com sucesso' })
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto)
  }
}
