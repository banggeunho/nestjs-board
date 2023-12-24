import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserCreateDto {
  @MinLength(5)
  @MaxLength(10)
  @IsNotEmpty()
  username: string;

  @MinLength(5)
  @MaxLength(10)
  @IsNotEmpty()
  password: string;

  @MinLength(5)
  @IsNotEmpty()
  name: string;

  @IsIn(['Female', 'Male'])
  @IsOptional()
  gender: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsPhoneNumber('KR')
  @IsOptional()
  phoneNumber: string;
}
