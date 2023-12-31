import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './exceptions/http.exception';
import { readFile } from 'fs';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());
  const config = new DocumentBuilder()
    .setTitle('Board Platform')
    .setDescription('The Board API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  readFile(join(__dirname, '/config/running.txt'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading ascii art file', err);
      return;
    }

    console.log(data);
  });

  await app.listen(3000);
}
bootstrap();
