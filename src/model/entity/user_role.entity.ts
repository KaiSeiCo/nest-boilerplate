import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, PrimaryColumn } from 'typeorm'
import { BaseEntity } from './base.entity'

@Entity({ name: 'tb_user_role' })
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
  user_id: number

  @Column({
    type: 'bigint',
  })
  @ApiProperty()
  role_id: number
}
