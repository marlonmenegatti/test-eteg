import { Module } from '@nestjs/common'
import { ColorsModule } from './colors/colors.module'
import { PrismaModule } from './prisma/prisma.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [PrismaModule, ColorsModule, UsersModule],
})
export class AppModule {}
