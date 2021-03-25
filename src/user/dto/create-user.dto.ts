import { IsEmail, IsString, Length } from 'class-validator';
import { UniqueOnDatabase } from 'src/validations/UniqueValidation';
import { User } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  @Length(3, 255)
  name: string;

  @IsEmail()
  @UniqueOnDatabase(User)
  email: string;

  @Length(6)
  password: string;
}
