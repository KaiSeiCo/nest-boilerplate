import { Body, Controller, Get, Query } from '@nestjs/common'
import { Param } from '@nestjs/common/decorators'
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { PageResult, Result } from 'src/common/class/result.class'
import { Authorize } from 'src/common/decorator/auth.decorator'
import { UserQueryDto } from 'src/model/dto/user.dto'
import { UserListVo } from 'src/model/vo/user.vo'
import { UserService } from 'src/service/user.service'

/**
 * @desc api used for authentication
 */
@ApiTags('用户模块')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({
    summary: '分页获取用户列表'
  })
  @Authorize()
  @Get('/list')
  async list(@Query() query: UserQueryDto): Promise<Result<PageResult<UserListVo>>> {
    console.log(query)
    const [list, total] = await this.userService.page(query);
    return Result.success({
        list,
        pagination: {
            total,
            page: query.page,
            size: query.limit,
        }
    })
  }
}
