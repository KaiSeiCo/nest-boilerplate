import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateRoleDto } from "src/model/dto/role.dto";
import { Role } from "src/model/entity/role.entity";
import { Repository } from "typeorm";

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>
  ) {}

  async list(): Promise<Role[]> {
    return await this.roleRepo.find();
  }

  async save(dto: CreateRoleDto) {
    await this.roleRepo.save(dto);
  }
}