import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS for frontend-backend communication
  await app.listen(3000); // NestJS backend running on port 3000
}
bootstrap();
