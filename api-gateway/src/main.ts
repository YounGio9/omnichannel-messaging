import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createDocument } from 'swagger/swagger';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { RpcExceptionFilter } from './filters/rpc-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new RpcExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  SwaggerModule.setup('api/v1', app, createDocument(app));
  await app.listen(3000);
}
bootstrap();
