import { Test, TestingModule } from '@nestjs/testing';
import { BoardService } from './board.service';
import { Repository } from 'typeorm';
import { BoardEntity } from './board.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('BoardService', () => {
  let boardService: BoardService;
  let boardRepository: Repository<BoardEntity>;
  const boardRepositoryToken = getRepositoryToken(BoardEntity);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoardService,
        {
          provide: boardRepositoryToken,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    boardService = module.get<BoardService>(BoardService);
    boardRepository = module.get<Repository<BoardEntity>>(boardRepositoryToken);
  });

  it('BoardService should be defined', () => {
    expect(boardService).toBeDefined();
  });

  it('BoardRepository should be defined', () => {
    expect(boardRepository).toBeDefined();
  });

  describe('게시글 조회', () => {
    it('2번 게시글의 작성자는 fastcampus 다', async () => {
      jest.spyOn(boardRepository, 'findOne').mockResolvedValue({
        id: 1,
        userId: 2,
        contents: '게시글',
        user: {
          id: 2,
          username: 'geunho',
          name: 'geunho',
        },
      } as BoardEntity);
      const board = await boardService.findById(1);
      expect(board.user.name).toBe('geunho');
    });
  });
});
