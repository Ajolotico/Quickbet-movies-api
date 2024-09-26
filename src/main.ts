import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app
    .use(json({ limit: '50mb' }))
    .use(urlencoded({ extended: true, limit: 50 }));
  const config = new DocumentBuilder()
    .addBearerAuth()
    .addSecurity('Authorization', {
      type: 'apiKey',
      'x-tokenName': 'authorization',
      name: 'authorization',
      in: 'header',
      description: 'Jwt token for authentication',
    })
    .addSecurityRequirements('Authorization')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const pathSwagger = 'swagger';
  SwaggerModule.setup(pathSwagger, app, document);
  const port = 5001;
  await app
    .listen(5001)
    .then(() => {
      logger.debug(`Application is running http://localhost:${port}`);
      logger.debug(
        `Documentation is running http://localhost:${port}/${pathSwagger}`,
      );
    })
    .catch((err) => {
      const portValue: number | string = port || '<Not defined>';
      logger.error(`Application failed to start on port ${portValue}`);
      logger.error(err);
    });
}
bootstrap();
