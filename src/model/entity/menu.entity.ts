import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, PrimaryColumn } from 'typeorm'
import { BaseEntity } from './base.entity'

@Entity({ name: 'tb_menu' })
export class Menu extends BaseEntity {
  @PrimaryColumn({
    type: 'bigint',
    unsigned: true,
  })
  @ApiProperty()
  id: number

  @Column({
    nullable: true,
    type: 'bigint',
    unsigned: true,
    comment: '父级菜单id'
  })
  @ApiProperty()
  parent_id: number

  @Column({
    type: 'varchar',
    comment: '菜单名称'
  })
  @ApiProperty()
  name: string

  @Column({
    nullable: true,
    type: 'varchar',
    comment: '菜单路由'
  })
  @ApiProperty()
  router: string

  @Column({
    nullable: true,
    type: 'varchar',
    comment: '菜单权限'
  })
  @ApiProperty()
  perms: string

  @Column({
    nullable: true,
    type: 'tinyint',
    comment: '类型 0-导航 1-底级导航(关联url) 2-按钮'
  })
  @ApiProperty()
  type: number

  @Column({
    nullable: true,
    type: 'varchar',
    comment: '按钮/菜单图标'
  })
  icon: string

  @Column({
    nullable: true,
    type: 'int',
    comment: '显示顺序'
  })
  order_num: number

  @Column({
    nullable: true,
    type: 'varchar',
    comment: '页面路径'
  })
  view_path: string

  @Column({
    nullable: true,
    type: 'tinyint',
  })
  keepalive: number

  @Column({
    nullable: true,
    type: 'tinyint',
    comment: '是否显示'
  })
  is_show: number
}
