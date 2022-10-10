import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { APP_GUARD, RouterModule } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ADMIN_ROUTER_PREFIX } from 'src/common/constant/router-prefix.constants'
import { AuthGuard } from 'src/common/guard/auth.guard'
import { LoggerMiddleware } from 'src/common/middleware/logger.middleware'
import { OperationLog } from 'src/model/entity/opt_log.entity'
import { AdminAuthModule } from './auth/auth.module'

@Module({
  imports: [
    RouterModule.register([
      {
        path: ADMIN_ROUTER_PREFIX,
        children: [{ path: 'auth', module: AdminAuthModule }],
      },
    ]),
    AdminAuthModule,
    TypeOrmModule.forFeature([OperationLog])
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('admin');
  }
}
