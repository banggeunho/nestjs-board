import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { BoardCreateDto } from './dto/board-create.dto';
import { BoardUpdateDto } from './dto/board-update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/modules/user/user.entity';
import { BoardEntity } from 'src/modules/board/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(BoardEntity)
    private boardRepository: Repository<BoardEntity>,
  ) {}

  findAll() {
    return this.boardRepository.find();
  }

  async findById(id: number) {
    const board = await this.boardRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
      },
    });

    if (!board) {
      throw new HttpException('Data Not Found', HttpStatus.NOT_FOUND);
    }

    return board;
  }

  async create(data: BoardCreateDto) {
    return this.boardRepository.save(data);
  }

  async update(userId: number, id: number, data: BoardUpdateDto) {
    const board = await this.getBoardById(id);

    if (userId !== board.userId) {
      throw new UnauthorizedException();
    }

    if (!board) {
      throw new HttpException('Data Not Found', HttpStatus.NOT_FOUND);
    }

    return this.boardRepository.update(id, {
      ...data,
    });
  }

  async remove(userId: number, id: number) {
    const board = await this.getBoardById(id);

    if (userId !== board.userId) {
      throw new UnauthorizedException();
    }

    if (!board) {
      throw new HttpException('Data Not Found', HttpStatus.NOT_FOUND);
    }

    return this.boardRepository.remove(board);
  }

  private async getBoardById(id: number) {
    return await this.boardRepository.findOneBy({ id });
  }
}
