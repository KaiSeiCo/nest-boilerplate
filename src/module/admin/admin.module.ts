import { Module } from '@nestjs/common'
import { APP_GUARD, RouterModule } from '@nestjs/core'
import { ADMIN_ROUTER_PREFIX } from 'src/common/constant/router-prefix.constants'
import { AuthGuard } from 'src/common/guard/auth.guard'
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
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [],
})
export class AdminModule {}
