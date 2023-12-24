import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  signup(@Body(new ValidationPipe()) data: UserCreateDto) {
    return this.userService.create(data);
  }

  @Post('login')
  login(@Body(new ValidationPipe()) data: UserLoginDto) {
    return this.userService.login(data);
  }

  @Get('me')
  me() {
    return this.userService.getMe();
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }
}
