import { Test, TestingModule } from '@nestjs/testing';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BoardEntity } from './board.entity';

describe('BoardController', () => {
  let boardController: BoardController;
  let service: BoardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardController],
      providers: [
        BoardService,
        {
          provide: getRepositoryToken(BoardEntity),
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

    boardController = module.get<BoardController>(BoardController);
    service = module.get<BoardService>(BoardService);
  });

  it('should be defined', async () => {
    jest.spyOn(service, 'findById').mockResolvedValue({
      id: 2,
      userId: 2,
      contents: '게시글',
      user: {
        id: 2,
        username: 'geunho',
        name: 'geunho',
      },
    } as BoardEntity);
    const board = await boardController.find(2);
    expect(board.user.name).toBe('geunho');
  });
});
