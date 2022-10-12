import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Result } from "src/common/class/result.class";
import { Authorize } from "src/common/decorator/auth.decorator";
import { CreateMenuDto } from "src/model/dto/menu.dto";
import { Menu } from "src/model/entity/menu.entity";
import { MenuService } from "./menu.service";

@ApiTags('菜单模块')
@ApiBearerAuth()
@Controller('menu')
export class MenuController {
  constructor(
    private readonly menuService: MenuService
  ){}

  @Authorize()
  @ApiOperation({ summary: '获取所有菜单' })
  @Get('list')
  async list(): Promise<Result<Menu[]>> {
    const menus = await this.menuService.list();
    return Result.success(menus)
  }

  @Authorize()
  @ApiOperation({ summary: '添加菜单' })
  @Post('add')
  async add(@Body() dto: CreateMenuDto): Promise<Result<void>> {
    await this.menuService.save(dto);
    return Result.success();
  }
}