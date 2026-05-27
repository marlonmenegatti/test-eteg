import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsHexColor, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateColorDto {
  @ApiProperty({ example: 'Vermelho' })
  @IsString()
  @IsNotEmpty()
  name!: string

  @ApiProperty({ example: '#FF0000' })
  @IsString()
  @IsHexColor()
  hex!: string

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean
}
