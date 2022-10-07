import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import User from '../model/entity/User.entity'
import { Repository } from 'typeorm'
import { UserDto, UserRegisterDto } from 'src/model/dto/user.dto'
import { ApiException } from 'src/common/exception/api.exception'
import { bcryptPassword } from 'src/util/bcrypt.util'
import { Snowflake } from 'nodejs-snowflake'
import { toNumber } from 'lodash'
import { Authorize } from 'src/common/decorator/auth.decorator'

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}

  async findUser(userDto: UserDto): Promise<User> {
    const user = await this.userRepo.findOneBy({
      username: userDto.username,
    })

    if (!user) {
      throw new ApiException(41004)
    }
    if (user.password !== userDto.password) {
      throw new ApiException(41005)
    }

    return user
  }

  async register(waitToReg: UserRegisterDto) {
    const user = await this.userRepo.findOneBy({
      username: waitToReg.username
    })

    if (user) {
      throw new ApiException(41006)
    }

    waitToReg.password = bcryptPassword(waitToReg.password)
    const id = new Snowflake().getUniqueID().toString()
    console.log(id)

    const result = await this.userRepo.insert({
      id: toNumber(id),
      ...waitToReg
    })

    return result.identifiers.length > 0
  }
}
