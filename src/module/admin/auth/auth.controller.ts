import { Controller } from '@nestjs/common'
import { Body, Get, Post } from '@nestjs/common/decorators'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Result } from 'src/common/class/result.class'
import { Authorize } from 'src/common/decorator/auth.decorator'
import { UserLoginDto, UserRegisterDto } from 'src/model/dto/user.dto'
import { LoginVo } from 'src/model/vo/user.vo'
import { UserService } from 'src/service/user.service'

/**
 * @desc api used for authentication
 */
@ApiTags('认证模块')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}

  /**
   * @desc login user
   * @returns userinfo
   */
  @Authorize()
  @Post('login')
  async login(@Body() loginDto: UserLoginDto): Promise<Result<LoginVo>> {
    const token = await this.userService.login(loginDto)
    return Result.success(token)
  }

  /**
   * @desc register user
   * @returns true|false
   */
  @Authorize()
  @Post('register')
  async register(@Body() waitToReg: UserRegisterDto): Promise<Result<boolean>> {
    await this.userService.register(waitToReg)
    return Result.success()
  }

  @Get('test')
  async test(): Promise<Result<any>> {
    return Result.success()
  }
}
