import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BlacklistService } from '../../entities/blacklist/blacklist.service';
import { env } from 'process';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly blacklistService: BlacklistService,
  ) {}

  async use(req: any, res: any, next: () => void) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).send('Unauthorized: No token provided');
    }
    const tokenActive = await this.blacklistService.isActive(token);

    if (!tokenActive) {
      res.status(401).send('Unauthorized');
    }
    const payload = this.jwtService.verify(token, { secret: env.SEC_JWT });
    req.user = payload;
    next();
  }
}
