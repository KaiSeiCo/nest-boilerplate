import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length } from 'class-validator'

export class UserDto {
  @ApiProperty({ description: '用户名', required: true })
  @IsString()
  @Length(6)
  username: string

  @ApiProperty({ description: '密码', required: true })
  @IsString()
  password: string
}
