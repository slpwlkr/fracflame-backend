import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/current')
  async findByToken(@Req() req) {
    return await this.usersService.findOneByID(req.user.userid)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Req() req, @Param('id') id: string) {
    if (req.user.userid === +id) {
      return await this.usersService.removeByID(+id)
    } else {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'user id does not match token'
      }, HttpStatus.BAD_REQUEST)
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Req() req, @Param('id') id: string, @Body() data: UpdateUserDto) {
    if (req.user.userid === +id) {
      return await this.usersService.update(+id, data)
    } else {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'user id does not match token'
      }, HttpStatus.BAD_REQUEST)
    }
  }
}
