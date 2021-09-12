import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

// 仅测试用
export type testUser = any;
@Injectable()
export class UsersService {
  private readonly testUsers = [
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

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private connection: Connection
  ) {}

  async create(user: User) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(user);

      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user!`;
  }

  remove(id: number) {
    return `This action removes a #${id} user!`;
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne(
      {
        where: { username: username }
      }
    )
  }
}
