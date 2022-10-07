import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity({ name: 'tb_menu' })
export class Menu extends BaseEntity {
    @PrimaryColumn({
        type: 'bigint'
    })
    @ApiProperty()
    id: number

    @Column({
        nullable: true,
        type: 'bigint'
    })
    @ApiProperty()
    parent_id: number

    @Column({
        type: 'varchar'
    })
    @ApiProperty()
    name: string

    @Column({
        nullable: true,
        type: 'varchar'
    })
    @ApiProperty()
    router: string

    @Column({
        nullable: true,
        type: 'varchar'
    })
    @ApiProperty()
    perms: string
    
    @Column({
        nullable: true,
        type: 'tinyint'
    })
    @ApiProperty()
    type: number

    @Column({
        nullable: true,
        type: 'varchar'
    })
    icon: string

    @Column({
        nullable: true,
        type: 'int'
    })
    order_num: number

    @Column({
        nullable: true,
        type: 'varchar'
    })
    view_path: string

    @Column({
        nullable: true,
        type: 'tinyint'
    })
    keepalive: number

    @Column({
        nullable: true,
        type: 'tinyint'
    })
    is_show: number
}