import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardEntity } from 'src/modules/board/board.entity';
import { UserEntity } from 'src/modules/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BoardEntity, UserEntity])],
  providers: [BoardService],
  controllers: [BoardController],
})
export class BoardModule {}
