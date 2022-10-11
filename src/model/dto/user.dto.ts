import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator'
import { PageOptionsDto } from './page.dto'

export class UserLoginDto {
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
  @IsOptional()
  @IsEmail()
  email?: string

  @ApiProperty({ description: '昵称', required: false })
  @IsOptional()
  @Length(6, 32)
  nickname?: string

  @ApiProperty({ description: '介绍', required: false })
  @IsOptional()
  @Length(0, 128)
  intro?: string

  @ApiProperty({ description: '头像', required: false })
  @IsOptional()
  @IsUrl()
  avatar?: string
}

export class UserQueryDto extends PageOptionsDto {

  @ApiProperty({ description: '用户名', required: false })
  @IsOptional()
  username?: string

  @ApiProperty({ description: '状态 1启用 0封禁', required: false })
  @IsOptional()
  status?: number
  
  @ApiProperty({ description: '邮箱', required: false })
  @IsOptional()
  email?: string
}
