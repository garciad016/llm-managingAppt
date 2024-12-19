import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  const port = 3000;
  app.setGlobalPrefix(globalPrefix);
  setupSwagger(app)
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  await app.listen(port);
  Logger.log(
    `:rocket: Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}
function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle("Doctor's appointment API")
    .setDescription("The API for Doctor's appointment backend.")
    .addBearerAuth()
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    jsonDocumentUrl: '/api-json',
  });
}

bootstrap();
