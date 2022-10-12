import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateMenuDto } from "src/model/dto/menu.dto";
import { Menu } from "src/model/entity/menu.entity";
import { Repository } from "typeorm";

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepo: Repository<Menu>
  ) {}

  async list(): Promise<Menu[]> {
    return await this.menuRepo.find();
  }

  async save(menu: CreateMenuDto) {
    await this.menuRepo.save(menu)
  }
}