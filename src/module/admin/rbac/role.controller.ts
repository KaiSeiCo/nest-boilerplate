import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Result } from "src/common/class/result.class";
import { Authorize } from "src/common/decorator/auth.decorator";
import { CreateRoleDto } from "src/model/dto/role.dto";
import { Role } from "src/model/entity/role.entity";
import { RoleService } from "./role.service";

@ApiTags('角色模块')
@ApiBearerAuth()
@Controller('role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService
  ){}

  @Authorize()
  @ApiOperation({ summary: '获取所有角色' })
  @Get('list')
  async list(): Promise<Result<Role[]>> {
    const role = await this.roleService.list();
    return Result.success(role)
  }

  @Authorize()
  @ApiOperation({ summary: '添加角色' })
  @Post('add')
  async add(@Body() dto: CreateRoleDto): Promise<Result<void>> {
    await this.roleService.save(dto);
    return Result.success();
  }
}