import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import User from '../../../model/entity/User.entity'
import { UserService } from '../../../service/user.service'
import { AuthController } from './auth.controller'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [AuthController],
})
export class AdminAuthModule {}
