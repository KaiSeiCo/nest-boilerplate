import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { OperationLogService } from 'src/service/opt_log.service'
import geoip, { Lookup } from 'geoip-lite'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly optService: OperationLogService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const { method, ip, originalUrl, headers } = req
    let geo: Lookup = null
    if (ip !== '127.0.0.1') {
      geo = geoip.lookup(ip)
    }
    const realIp = (headers['x-forwarded-for'] || ip) as string
    this.optService.saveLog({
      path: originalUrl,
      ip_source: realIp ?? '',
      ip_address: geo ? geo.city : '',
      method: method,
    })

    next()
  }
}
