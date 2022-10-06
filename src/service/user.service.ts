import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import User from '../model/entity/User.entity'
import { Repository } from 'typeorm'
import { UserDto } from 'src/model/dto/user.dto'
import { ApiException } from 'src/common/exception/api.exception'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
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
}
