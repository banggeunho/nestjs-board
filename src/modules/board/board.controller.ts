import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { ApiTags } from '@nestjs/swagger';
import { BoardCreateDto } from './dto/board-create.dto';
import { BoardUpdateDto } from './dto/board-update.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { UserInfo } from 'src/decorators/user-info.decorator';

@Controller('boards')
@ApiTags('Board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  findAll() {
    return this.boardService.findAll();
  }

  @Get(':id')
  find(@Param('id', ParseIntPipe) id: number) {
    return this.boardService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@UserInfo() userInfo, @Body() data: BoardCreateDto) {
    if (!userInfo) {
      throw new UnauthorizedException();
    }
    return this.boardService.create({
      ...data,
      userId: userInfo.id,
    });
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @UserInfo() userInfo,
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) data: BoardUpdateDto,
  ) {
    return this.boardService.update(userInfo.id, id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@UserInfo() userInfo, @Param('id', ParseIntPipe) id: number) {
    return this.boardService.remove(userInfo.id, id);
  }
}
