import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, isNotEmpty, IsString, IsUrl, Length } from 'class-validator'

export class UserDto {
  @ApiProperty({ description: '用户名', required: true })
  @IsString()
  @Length(6)
  username: string

  @ApiProperty({ description: '密码', required: true })
  @IsString()
  password: string
}

export class UserRegisterDto {

  @ApiProperty({ description: '用户名', required: true })
  @IsString()
  @Length(6, 32)
  username: string

  @ApiProperty({ description: '密码', required: true })
  @IsString()
  @Length(6, 32)
  password: string

  @ApiProperty({ description: '邮箱', required: false })
  @IsEmail()
  email?: string

  @ApiProperty({ description: '昵称', required: false })
  @Length(6, 32)
  nickname?: string

  @ApiProperty({ description: '介绍', required: false })
  @Length(0, 128)
  intro?: string

  @ApiProperty({ description: '头像', required: false })
  @IsUrl()
  avatar?: string
}
