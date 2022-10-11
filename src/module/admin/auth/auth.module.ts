import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OperationLog } from 'src/model/entity/opt_log.entity'
import { OperationLogService } from 'src/service/opt_log.service'
import User from '../../../model/entity/User.entity'
import { UserService } from '../../../service/user.service'
import { AuthController } from './auth.controller'

@Module({
  imports: [TypeOrmModule.forFeature([User, OperationLog])],
  providers: [UserService, OperationLogService],
  controllers: [AuthController],
  exports: [OperationLogService]
})
export class AdminAuthModule {}
