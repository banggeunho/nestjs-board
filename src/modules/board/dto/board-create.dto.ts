import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class BoardCreateDto {
  userId: number;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  @ApiProperty({
    description: '제목',
    required: true,
    example: '나는요 나는요',
  })
  title: string;

  @IsNotEmpty()
  @ApiProperty({
    description: '컨텐츠',
    required: true,
    example: '나는요 바보바보바보',
  })
  contents: string;
}
