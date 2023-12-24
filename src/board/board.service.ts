import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BoardCreateDto } from './dto/board-create.dto';
import { BoardUpdateDto } from './dto/board-update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { BoardEntity } from 'src/entity/board.entity';

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

  async update(id: number, data: BoardUpdateDto) {
    const board = await this.getBoardById(id);

    if (!board) {
      throw new HttpException('Data Not Found', HttpStatus.NOT_FOUND);
    }

    return this.boardRepository.update(id, {
      ...data,
    });
  }

  async remove(id: number) {
    const board = await this.getBoardById(id);

    if (!board) {
      throw new HttpException('Data Not Found', HttpStatus.NOT_FOUND);
    }

    return this.boardRepository.remove(board);
  }

  private async getBoardById(id: number) {
    return await this.boardRepository.findOneBy({ id });
  }
}
