import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, PrimaryColumn } from 'typeorm'
import { BaseEntity } from './base.entity'

@Entity({ name: 'tb_user' })
export default class User extends BaseEntity {
  @PrimaryColumn({
    type: 'bigint',
    unsigned: true,
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
    length: 1024,
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
    length: 128,
  })
  @ApiProperty()
  intro: string

  @Column({})
  @ApiProperty()
  password: string

  @Column({
    type: 'tinyint',
    nullable: true,
  })
  @ApiProperty()
  status: number
}
