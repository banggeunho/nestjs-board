import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { LoggingMiddleWare } from './middleware/logging.middleware';
import ConfigModule from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    ConfigModule(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'postgres',
      entities: [__dirname + '/**/*.entity.{.ts,.js}'],
      synchronize: false,
    }),
    BoardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleWare).forRoutes('*');
  }
}
