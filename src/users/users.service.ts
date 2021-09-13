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

  async findOneByID(id: number) {
    const user = await this.usersRepository.findOne(id);
    const { password, ...result } = user;
    return result;
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return await this.usersRepository.findOne(
      {
        where: { username: username }
      }
    )
  }

  async create(data: CreateUserDto) {
    const user = await this.usersRepository.create({
      username: data.username,
      password: data.password
    });
    await this.usersRepository.save(user);
    return await this.findOneByUsername(user.username)
  }

  async update(id: number, data: UpdateUserDto) {
    const updatedEntity = {}
    Object.assign(updatedEntity, data.username ? { username: data.username } : {})
    Object.assign(updatedEntity, data.password ? { password: data.password } : {})
    await this.usersRepository.update(id, updatedEntity)
    return await this.findOneByID(id)
  }

  async removeByID(id: number) {
    await this.usersRepository.delete(id)
    return {
      deleted: true,
      deletedID: id
    }
  }


}
