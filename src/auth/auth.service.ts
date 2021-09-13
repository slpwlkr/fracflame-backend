import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  )
  {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username)
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // auth/login接口配置了local-auth-guard，这里不用验证
  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: any) {
    const localUser = await this.usersService.findOneByUsername(user.username)
    if (localUser && Object.keys(localUser).length !== 0) {
      return null;
    }
    const { password, ...result } = await this.usersService.create({ username: user.username, password: user.password });
    return result;
  }
}
