import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { ADMIN_ROUTER_PREFIX } from 'src/common/constant/router-prefix.constants'
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
  providers: [],
  exports: [],
})
export class AdminModule {}
