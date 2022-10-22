import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'tb_role_menu' })
export class RoleMenu extends BaseEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  @ApiProperty()
  id: number;

  @Column({
    type: 'int',
    unsigned: true,
    comment: '角色id',
  })
  @ApiProperty()
  role_id: number;

  @Column({
    type: 'int',
    unsigned: true,
    comment: '菜单id',
  })
  @ApiProperty()
  menu_id: number;
}
