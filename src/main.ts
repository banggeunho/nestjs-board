import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './exceptions/http.exception';

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

  console.log(`
                                                 *

               *        /)___________/)
                       / ,--o ______/ /       *         *
                      / /__\\       / |               *
   *                 /  {''}]     /  |
                     .--{~\`/--.   )  \\__              *
                    /   { }    \\ /     /
         *         /_/   ~   /_//'  / /
                 .-""==="==="" |   / /
   *             /  |-(__)(__)/__| /_/  *         *
               /   | \\  |\\  |__ ) /
              /   / //_/ /_/   / /
             /  _/_/________  / /   *       *
  *          /  (            (/ /
           /    \\==========   /
       snd/      (___________/                    *
         /      _/ /     _/ /
 |\\/|   /      \\\\\\_/     \\\\_/   *     
 00 | _/________ |\\/|    /
/_/|_\\/          00 |  _/    *             *
 __/ )|         /_/|_\\//
VV--   \\         __/ )|
   |_   |       VV--   \\
  / / / )          |_   |    *       *             
 |_|_/\\_/\\____    / / / )       *                *
  ////  '-----'  |_|_/\\_/\\____ 
 ////             ////         *        *
                 
`);

  await app.listen(3000);
}
bootstrap();
