import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { matchesHash } from '../../shared/services/bcrypt.service';
import { env } from 'process';
import { BlacklistService } from '../blacklist/blacklist.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly blacklistService: BlacklistService,
    private jwt: JwtService,
  ) {}

  async login(user: CreateAuthDto) {
    const foundUser = await this.usersService.searchUserByPass(user.email);

    if (!foundUser)
      throw new UnauthorizedException('Email or password is invalid');

    const isMatch = matchesHash(foundUser.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      user_id: foundUser.user_id,
      first_name: foundUser.first_name,
      last_name: foundUser.last_name,
    };
    const accessToken = this.jwt.sign(payload, {
      secret: env.SEC_JWT,
      expiresIn: '2d',
    });

    return accessToken;
  }

  async logout(token: string) {
    await this.blacklistService
      .create(token)
      .then(() => `Logged out successfully`);
  }

  async register(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
