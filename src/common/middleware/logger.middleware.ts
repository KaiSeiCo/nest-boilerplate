import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, NextFunction } from 'express';
import { OperationLogService } from 'src/service/opt_log.service';
import geoip, { Lookup } from 'geoip-lite';
import { FastifyReply } from 'fastify/types/reply';
import { LoggerService } from 'src/share/logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    private readonly optService: OperationLogService,
    private readonly logger: LoggerService,
  ) {}
  use(req: Request, res: FastifyReply, next: NextFunction) {
    try {
      const { method, ip, originalUrl, headers } = req;
      let geo: Lookup = null;
      if (ip !== '127.0.0.1') {
        geo = geoip.lookup(ip);
      }
      const realIp = (headers['x-forwarded-for'] || ip) as string;
      this.optService.saveLog({
        path: originalUrl,
        ip_source: realIp ?? '',
        ip_address: geo ? geo.city : '',
        method: method,
      });
    } catch (e) {
      this.logger.warn('[Warn] try to save user opt log fail', e);
    }

    next();
  }
}
