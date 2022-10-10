import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import User from '../model/entity/User.entity'
import { Repository } from 'typeorm'
import { UserLoginDto, UserRegisterDto } from 'src/model/dto/user.dto'
import { ApiException } from 'src/common/exception/api.exception'
import { bcryptPassword, comparePassword } from 'src/util/bcrypt.util'
import { Snowflake } from 'nodejs-snowflake'
import { isEmpty, toNumber } from 'lodash'
import { JwtService } from '@nestjs/jwt'
import { LoginVo } from 'src/model/vo/user.vo'

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
    })

    if (isEmpty(user)) {
      throw new ApiException(41004)
    }
    if (!comparePassword(loginDto.password, user.password)) {
      throw new ApiException(41005)
    }
    const token = this.jwtService.sign({
      ...user,
    })

    return { token }
  }

  async register(waitToReg: UserRegisterDto) {
    const user = await this.userRepo.findOneBy({
      username: waitToReg.username,
    })

    if (user) {
      throw new ApiException(41006)
    }

    waitToReg.password = bcryptPassword(waitToReg.password)

    const id = new Snowflake()
      .idFromTimestamp(Date.parse(new Date().toString()))
      .toString()
    console.log(id)

    const result = await this.userRepo.insert({
      id: toNumber(id),
      ...waitToReg,
      status: 1,
    })

    return result.identifiers.length > 0
  }
}
