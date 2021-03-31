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
  async delete(@Param() params) {
    const { id } = params;
    await this.userService.findOne(id);

    this.userService.delete(+id);
  }

  @Get()
  index(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  show(@Param() params): Promise<User> {
    const { id } = params;
    return this.userService.findOne(id);
  }

  @Post()
  store(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.store(body);
  }

  @Put(':id')
  async update(@Param() params, @Body() body: UpdateUserDto): Promise<User> {
    const { id } = params;
    await this.userService.findOne(id);
    await this.userService.update(id, body);

    return await this.userService.findOne(id);
  }
}
