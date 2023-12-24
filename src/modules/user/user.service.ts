import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/user/user.entity';
import { Repository } from 'typeorm';
import { BoardEntity } from '../board/board.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async signup(data) {
    return null;
  }

  async login(data) {
    return null;
  }

  getMe() {
    return null;
  }

  public async getUsers() {
    const qb = this.userRepository.createQueryBuilder('User');

    qb.addSelect((subQuery) => {
      return subQuery
        .select('count(id)')
        .from(BoardEntity, 'Board')
        .where('Board.userId = User.id');
    }, 'User_boardCount');

    return qb.getMany();
  }
}
