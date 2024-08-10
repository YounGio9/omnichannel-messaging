import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  type OpenAPIObject,
  SwaggerModule,
} from '@nestjs/swagger';

export function createDocument(app: INestApplication): OpenAPIObject {
  const config = new DocumentBuilder()
    .setTitle('Omnichannel Messaging')
    .setDescription('An omnichannel messaging system')
    .addBasicAuth()
    .setVersion('1.0')
    .build();

  return SwaggerModule.createDocument(app, config);
}
