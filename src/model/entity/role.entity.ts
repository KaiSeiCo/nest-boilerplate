import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'tb_role' })
export class Role extends BaseEntity {
  @PrimaryColumn({
    type: 'bigint',
    unsigned: true,
  })
  @ApiProperty()
  id: number;

  @Column({
    type: 'varchar',
    comment: '角色名称',
  })
  @ApiProperty()
  role_name: string;

  @Column({
    type: 'varchar',
    comment: '角色标签',
  })
  @ApiProperty()
  role_label: string;

  @Column({
    type: 'varchar',
    nullable: true,
    comment: '备注',
  })
  @ApiProperty()
  remark: string;
}
