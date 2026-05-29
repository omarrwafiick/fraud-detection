import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { WinstonModule, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { loggerConfig } from './common/logger.config';
import { GatewayLoggingInterceptor } from './common/interceptor/gatewayLogging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(loggerConfig),
  });

  configPipes(app);

  const port = process.env.PORT || 3000;

  await app.listen(port);

  await configLogger(app);
}

function configPipes(app: INestApplication<any>){
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      disableErrorMessages: false,
    }),
  );
}

async function configLogger(app: INestApplication<any>){
  app.useGlobalInterceptors(new GatewayLoggingInterceptor());

  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  
  logger.log(`Application running dynamically on: ${await app.getUrl()}`);
}

bootstrap();
