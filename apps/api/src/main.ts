import { BadRequestException, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import 'dotenv/config'
import { AppModule } from './app.module'
import { PrismaExceptionFilter } from './filters/prisma-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()

  if (process.env.NODE_ENV !== 'production') {
    const { DocumentBuilder, SwaggerModule } = await import('@nestjs/swagger')
    const config = new DocumentBuilder()
      .setTitle('ETEG API')
      .setDescription('Documentação da API ETEG')
      .setVersion('1.0')
      .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/docs', app, document)
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const messages = errors.flatMap((error) => Object.values(error.constraints ?? {}))
        throw new BadRequestException(messages)
      },
    }),
  )

  app.useGlobalFilters(new PrismaExceptionFilter())

  await app.listen(process.env.PORT ?? 3030)
}
bootstrap()
