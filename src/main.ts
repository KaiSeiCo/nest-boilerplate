import {
  HttpStatus,
  Logger,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { FastifyAdapter } from '@nestjs/platform-fastify/adapters';
import { ValidationError } from 'class-validator';
import { AppModule } from './app.module';
import { ApiExceptionFilter } from './common/filter/api-exception.filter';
import { setupSwagger } from './config/swagger.config';
import { LoggerService } from './share/logger/logger.service';

const PORT = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      bufferLogs: true,
    },
  );
  app.enableCors();

  // custom logger
  app.useLogger(app.get(LoggerService));

  // global pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      exceptionFactory: (errors: ValidationError[]) => {
        let errorMsg = 'Illegal Arguments';
        Object.keys(errors[0].constraints).forEach((key) => {
          if (key) {
            errorMsg = errors[0].constraints[key];
            return;
          }
        });
        return new UnprocessableEntityException(errorMsg);
      },
    }),
  );

  // global filter
  app.useGlobalFilters(new ApiExceptionFilter());

  // swagger
  setupSwagger(app);

  // boot
  await app.listen(PORT, '0.0.0.0');
  const serverUrl = await app.getUrl();
  Logger.log(`🚀 服务启动成功: ${serverUrl}`);
  const swaggerPath = process.env.SWAGGER_PATH
    ? `${process.env.SWAGGER_PATH}`
    : 'swagger-api';
  const swaggerUrl = `${serverUrl}/${swaggerPath}/`;
  Logger.log(`🚀 Swagger 启动成功: ${swaggerUrl}`);
}
bootstrap();
