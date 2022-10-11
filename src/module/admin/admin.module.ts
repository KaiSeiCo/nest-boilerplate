import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthGuard } from 'src/common/guard/auth.guard'
import { LoggerMiddleware } from 'src/common/middleware/logger.middleware'
import { OperationLog } from 'src/model/entity/opt_log.entity'
import User from 'src/model/entity/User.entity'
import { OperationLogService } from 'src/service/opt_log.service'
import { UserService } from 'src/service/user.service'
import { AuthController } from './auth/auth.controller'
import { UserController } from './user/user.controller'

@Module({
  imports: [TypeOrmModule.forFeature([User, OperationLog])],
  providers: [
    UserService,
    OperationLogService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController, UserController],
  exports: [OperationLogService],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('admin')
  }
}
