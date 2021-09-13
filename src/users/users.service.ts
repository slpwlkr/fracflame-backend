import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private connection: Connection
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOneByID(id: number): Promise<User | undefined> {
    return this.usersRepository.findOne(id);
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne(
      {
        where: { username: username }
      }
    )
  }

  async create(data: CreateUserDto) {
    const user = this.usersRepository.create({
      username: data.username,
      password: data.password
    });
    this.usersRepository.save(user);
    return user
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user!`;
  }

  remove(id: number) {
    return `This action removes a #${id} user!`;
  }


}
