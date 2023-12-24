import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { Ip } from './decorators/ip.decorator';

@Controller()
@ApiTags('main')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('name/:name')
  getName(@Param('name') name: string): string {
    return `${name} hello`;
  }

  @Get('name')
  getNameQuery(@Ip() ip: string, @Query('name') name: string): string {
    return `${name} hello ${ip}`;
  }
}
