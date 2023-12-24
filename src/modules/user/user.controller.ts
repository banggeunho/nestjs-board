import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  signup(@Body() data) {
    return this.userService.signup(data);
  }

  @Post()
  login(@Body() data) {
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
