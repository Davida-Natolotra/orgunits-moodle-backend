import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Configure CORS
  app.enableCors({
    origin: 'http://localhost:4200', // Allow requests from your Angular app
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Allow specific methods
    credentials: true, // Allow authentication cookies/tokens if needed
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
