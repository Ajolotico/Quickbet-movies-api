import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { BlacklistService } from '../blacklist/blacklist.service';

@Module({
  imports: [JwtModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService, BlacklistService],
})
export class AuthModule {}
