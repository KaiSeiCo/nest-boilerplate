import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { FastifyRequest } from 'fastify'
import { AUTHORIZE_KEY_METADATA } from '../constant/auth.constant'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector, // private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // @Authorize 跳过校验
    const authorize = this.reflector.get<boolean>(
      AUTHORIZE_KEY_METADATA,
      context.getHandler(),
    )
    if (authorize) {
      return true
    }

    const request = context.switchToHttp().getRequest<FastifyRequest>()
    const url = request.url
    const path = url.split('?')[0]

    console.log(path)
    return true
  }
}
