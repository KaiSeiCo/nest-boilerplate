import { Controller } from '@nestjs/common'
import { Body, Post } from '@nestjs/common/decorators'
import { ApiTags } from '@nestjs/swagger'
import { Result } from 'src/common/class/result.class'
import { UserDto } from 'src/model/dto/user.dto'
import User from 'src/model/entity/User.entity'
import { UserService } from 'src/service/user.service'

/**
 * @desc api used for authentication
 */
@ApiTags('认证模块')
@Controller('')
export class AuthController {
  constructor(private userService: UserService) {}

  /**
   * @desc login
   * @returns
   */
  @Post('login')
  async login(@Body() userDto: UserDto): Promise<Result<User>> {
    const users = await this.userService.findUser(userDto)
    return Result.success(users)
  }
}
