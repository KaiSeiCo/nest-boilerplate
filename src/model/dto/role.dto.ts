import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, Matches, MinLength } from "class-validator";

export class CreateRoleDto {
  @ApiProperty({
    description: '角色名称',
  })
  @IsString()
  @MinLength(2)
  role_name: string;

  @ApiProperty({
    description: '角色唯一标识',
  })
  @IsString()
  @Matches(/^[a-z0-9A-Z]+$/)
  role_label: string;

  @ApiProperty({
    description: '角色备注',
    required: false,
  })
  @IsString()
  @IsOptional()
  remark: string;
}