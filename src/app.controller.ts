import { Body, Controller, Get, Post, Request, UseGuards, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @Post('auth/register')
  async register(@Body() data: CreateUserDto) {
    if (!(data.username && data.password)) {
      throw new BadRequestException();
    }
    const user =  await this.authService.register(data)
    if (user) {
      return {
        message: 'user created successfully',
        user
      }
    } else {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Username alreay exists.'
      }, HttpStatus.BAD_REQUEST)
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
