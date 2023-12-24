import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

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

  getUsers() {
    return this.userRepository.find();
  }
}
