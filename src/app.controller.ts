import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { Ip } from './decorators/ip.decorator';

@Controller()
@ApiTags('main')
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly logger = new Logger(AppController.name);

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
    this.logger.debug(`${name} hello ${ip}`);
    this.logger.fatal(`${name} hello ${ip}`);
    this.logger.warn(`${name} hello ${ip}`);
    this.logger.log(`${name} hello ${ip}`);
    this.logger.verbose(`${name} hello ${ip}`);
    this.logger.error(`${name} hello ${ip}`);
    return `${name} hello ${ip}`;
  }

  @Get('error')
  error() {
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }
}
