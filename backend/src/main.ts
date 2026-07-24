import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- Security hardening ---
  app.use(helmet());
  app.use(cookieParser());
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') ?? 'http://localhost:3000',
    credentials: true,
  });

  // --- Global validation (DTO -> class-validator) ---
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,          // strips unknown properties (defense-in-depth)
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  // Public content lives under /api/public/*, admin-only content under
  // /api/admin/*. This mirrors the two-URL separation on the frontend:
  // the public site never needs a token, and the private admin portal
  // (/portal-manajemen) exclusively talks to /api/admin/*.
  app.setGlobalPrefix('api');

  const port = process.env.PORT ?? 4000;
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`API running on http://localhost:${port}/api`);
}
bootstrap();
