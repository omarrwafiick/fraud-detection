import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { InternalTrafficGuard } from './shared/guards/internal-traffic.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  configPipes(app);

  configPrivateAccess(app);
  
  await app.listen(process.env.PORT ?? 3001);
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

function configPrivateAccess(app: INestApplication<any>){
  // Allow only access to gateway api
  app.useGlobalGuards(new InternalTrafficGuard());
  app.enableCors({
    origin: process.env.GATEWAY_ORIGIN || 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
}

bootstrap();
