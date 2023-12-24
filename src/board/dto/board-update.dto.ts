import { IsOptional, MaxLength, MinLength } from 'class-validator';

export class BoardUpdateDto {
  @MinLength(2)
  @MaxLength(20)
  @IsOptional()
  title?: string;

  @IsOptional()
  contents?: string;
}

// export class BoardUpdateDto extends PartialType(BoardCreateDto) {}
