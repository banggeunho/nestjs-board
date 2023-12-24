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

  private boards = [
    {
      id: 1,
      title: 'hello',
      content: 'Content 1',
    },
    {
      id: 2,
      title: 'world',
      content: 'Content 2',
    },
    {
      id: 3,
      title: 'fufufu',
      content: 'Content 3',
    },
    {
      id: 4,
      title: 'boat',
      content: 'Content 4',
    },
    {
      id: 5,
      title: 'kakao',
      content: 'Content 5',
    },
    {
      id: 6,
      title: 'seoul',
      content: 'Content 6',
    },
  ];
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

  update(id: number, data: BoardUpdateDto) {
    // const board = this.findById(id);

    // board.contents = data.contents;
    // board.title = data.title;

    return this.boards;
  }

  remove(id: number) {
    const index: number = this.boards.findIndex((board) => board.id === id);

    if (index < 0) {
      return null;
    }

    this.boards.splice(index, 1);
    return this.boards;
  }
}
