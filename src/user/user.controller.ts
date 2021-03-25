import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    await this.userService.findOne(+id);

    this.userService.delete(+id);
  }

  @Get()
  index(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  show(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(+id);
  }

  @Post()
  store(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.store(body);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    await this.userService.findOne(+id);
    await this.userService.update(+id, body);

    return await this.userService.findOne(+id);
  }
}
