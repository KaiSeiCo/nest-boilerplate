import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, PrimaryColumn } from 'typeorm'
import { BaseEntity } from './base.entity'

@Entity({ name: 'tb_user' })
export default class User extends BaseEntity {
  @PrimaryColumn({
    type: 'bigint',
  })
  @ApiProperty()
  id: number

  @Column({})
  @ApiProperty()
  username: string

  @Column({
    nullable: true,
  })
  @ApiProperty()
  nickname: string

  @Column({
    nullable: true,
  })
  @ApiProperty()
  email: string

  @Column({
    nullable: true,
  })
  @ApiProperty()
  avatar: string

  @Column({
    nullable: true,
  })
  @ApiProperty()
  intro: string

  @Column({})
  @ApiProperty()
  password: string
}
