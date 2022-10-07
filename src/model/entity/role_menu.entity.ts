import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, PrimaryColumn } from 'typeorm'
import { BaseEntity } from './base.entity'

@Entity({ name: 'tb_role_menu' })
export class UserRole extends BaseEntity {
  @PrimaryColumn({
    type: 'bigint',
  })
  @ApiProperty()
  id: number

  @Column({
    type: 'bigint',
  })
  @ApiProperty()
  role_id: number

  @Column({
    type: 'bigint',
  })
  @ApiProperty()
  menu_id: number
}
