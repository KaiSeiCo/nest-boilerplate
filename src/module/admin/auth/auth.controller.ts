import { Controller } from '@nestjs/common'
import { Body, Post } from '@nestjs/common/decorators'
import { ApiTags } from '@nestjs/swagger'
import { Result } from 'src/common/class/result.class'
import { Authorize } from 'src/common/decorator/auth.decorator'
import { UserDto, UserRegisterDto } from 'src/model/dto/user.dto'
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
   * @desc login user
   * @returns
   */
  @Post('login')
  async login(@Body() userDto: UserDto): Promise<Result<User>> {
    const users = await this.userService.findUser(userDto)
    return Result.success(users)
  }

  /**
   * @desc register user
   */
  @Authorize()
  @Post('register')
  async register(@Body() waitToReg: UserRegisterDto): Promise<Result<boolean>> {
    const user = await this.userService.register(waitToReg)
    return Result.success(user)
  }
}
