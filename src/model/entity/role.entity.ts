import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, PrimaryColumn } from 'typeorm'
import { BaseEntity } from './base.entity'

@Entity({ name: 'tb_role' })
export class Role extends BaseEntity {
  @PrimaryColumn({
    type: 'bigint',
    unsigned: true,
  })
  @ApiProperty()
  id: number

  @Column({
    type: 'bigint',
    unsigned: true,
  })
  @ApiProperty()
  user_id: number

  @Column({
    type: 'varchar',
  })
  @ApiProperty()
  role_name: string

  @Column({
    type: 'varchar',
  })
  @ApiProperty()
  role_label: string

  @Column({
    type: 'varchar',
    nullable: true,
  })
  @ApiProperty()
  remark: string
}
