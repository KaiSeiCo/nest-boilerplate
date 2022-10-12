import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from '../model/entity/User.entity';
import { Repository } from 'typeorm';
import {
  UserLoginDto,
  UserQueryDto,
  UserRegisterDto,
} from 'src/model/dto/user.dto';
import { ApiException } from 'src/common/exception/api.exception';
import { bcryptPassword, comparePassword } from 'src/util/bcrypt.util';
import { Snowflake } from 'nodejs-snowflake';
import { isEmpty, toNumber } from 'lodash';
import { JwtService } from '@nestjs/jwt';
import { LoginVo, UserListVo } from 'src/model/vo/user.vo';
import { isNotEmpty } from 'class-validator';
import { buildDynamicSqlAppendWhere } from 'src/util/typeorm.util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: UserLoginDto): Promise<LoginVo> {
    const user = await this.userRepo.findOne({
      where: { username: loginDto.username, status: 1 },
    });

    if (isEmpty(user)) {
      throw new ApiException(41004);
    }
    if (!comparePassword(loginDto.password, user.password)) {
      throw new ApiException(41005);
    }
    const token = this.jwtService.sign({
      ...user,
    });

    return { token };
  }

  async register(waitToReg: UserRegisterDto): Promise<boolean> {
    const user = await this.userRepo.findOneBy({
      username: waitToReg.username,
    });

    if (user) {
      throw new ApiException(41006);
    }

    waitToReg.password = bcryptPassword(waitToReg.password);

    const id = new Snowflake()
      .idFromTimestamp(Date.parse(new Date().toString()))
      .toString();

    const result = await this.userRepo.insert({
      id: toNumber(id),
      ...waitToReg,
      status: 1,
    });

    return result.identifiers.length > 0;
  }

  async page(query: UserQueryDto): Promise<[UserListVo[], number]> {
    const { username, email, status, page, limit } = query;
    const queryBase = this.userRepo.createQueryBuilder('').where('1 = 1');
    buildDynamicSqlAppendWhere(queryBase, [
      {
        field: 'username',
        condition: 'LIKE',
        value: username,
        fuzzy: true,
      },
      {
        field: 'email',
        condition: '=',
        value: email,
      },
      {
        field: 'status',
        condition: '=',
        value: status,
      },
    ])
      .skip((page - 1) * limit)
      .take(limit);
    const [_, total] = await queryBase.getManyAndCount();
    const list = await queryBase.getRawMany();
    console.log(list);
    const result: UserListVo[] = [];
    return [result, total];
  }
}
