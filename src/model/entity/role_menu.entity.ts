import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, PrimaryColumn } from 'typeorm'
import { BaseEntity } from './base.entity'

@Entity({ name: 'tb_role_menu' })
export class UserRole extends BaseEntity {
  @PrimaryColumn({
    type: 'bigint',
    unsigned: true,
  })
  @ApiProperty()
  id: number

  @Column({
    type: 'bigint',
    unsigned: true,
    comment: '角色id'
  })
  @ApiProperty()
  role_id: number

  @Column({
    type: 'bigint',
    unsigned: true,
    comment: '菜单id'
  })
  @ApiProperty()
  menu_id: number
}
