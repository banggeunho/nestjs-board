import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/board-create.dto';

@Injectable()
export class BoardService {
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
    return this.boards;
  }

  findById(id: number) {
    return this.boards.find((board) => board.id === id);
  }

  create(data: CreateBoardDto) {
    const newBoard = {
      id: this.boards.length + 1,
      ...data,
    };
    this.boards = [...this.boards, newBoard];
    return this.boards;
  }

  update(id: number, data: CreateBoardDto) {
    const board = this.findById(id);

    board.content = data.content;
    board.title = data.title;

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
