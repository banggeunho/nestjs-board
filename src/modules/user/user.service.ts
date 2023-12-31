import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/user/user.entity';
import { Repository } from 'typeorm';
import { BoardEntity } from '../board/board.entity';
import { UserCreateDto } from './dto/user-create.dto';
import { hash, compare } from 'bcrypt';
import { UserLoginDto } from './dto/user-login.dto';
import { sign } from 'jsonwebtoken';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  public async create(data: UserCreateDto) {
    const { username, name, password } = data;
    const encryptedPassword = await this.encrypt(password);
    return this.userRepository.save({
      username,
      name,
      password: encryptedPassword,
    });
  }

  public async login(data: UserLoginDto) {
    const { username, password } = data;
    const user = await this.getUserByUsername(username);

    if (!user) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const match = await compare(password, user.password);

    if (!match) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }

    const payload = {
      username,
      name: user.name,
    };

    const accessToken = sign(payload, 'secret_key', {
      expiresIn: '1h',
    });

    return {
      name: user.name,
      accessToken: accessToken,
    };
  }

  public async getUserByUsername(username: string) {
    return await this.userRepository.findOneBy({
      username,
    });
  }

  public getMe() {
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

  private encrypt(string: string) {
    return hash(string, 11);
  }
}
