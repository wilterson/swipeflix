import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  store(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);

    return this.userRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(findData: FindConditions<User>): Promise<User> {
    return this.userRepository.findOneOrFail(findData);
  }

  async update(id: number, data: UpdateUserDto): Promise<void> {
    await this.userRepository.update({ id }, data);
  }
}
