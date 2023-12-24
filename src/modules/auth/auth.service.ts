import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { UserEntity } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(username: string, password: string) {
    const user = await this.userService.getUserByUsername(username);

    if (user) {
      const match = await compare(password, user.password);
      if (match) {
        return user;
      } else {
        return null;
      }
    }
  }

  public async login(user: UserEntity) {
    const payload = {
      username: user.username,
      name: user.name,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
