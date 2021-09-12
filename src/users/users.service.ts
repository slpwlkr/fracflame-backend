import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// 仅测试用
export type User = any;
@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'user1',
      password: '111111',
    },
    {
      userId: 2,
      username: 'user2',
      password: '222222',
    },
  ];

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user!';
  }

  findAll() {
    return `This action returns all users!`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user!`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user!`;
  }

  remove(id: number) {
    return `This action removes a #${id} user!`;
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
