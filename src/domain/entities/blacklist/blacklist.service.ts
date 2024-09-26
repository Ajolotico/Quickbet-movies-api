import { Injectable } from '@nestjs/common';
import { Blacklist } from './entities/blacklist.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class BlacklistService {
  private mainRepo: Repository<Blacklist>;
  constructor(private dataSource: DataSource) {
    this.mainRepo = dataSource.getRepository(Blacklist);
  }

  async create(token: string): Promise<Blacklist> {
    return this.mainRepo.save({
      token: token,
    });
  }

  async isActive(token: string): Promise<boolean> {
    return this.mainRepo
      .findOne({
        where: {
          token: token,
        },
      })
      .then((blacklist) => !blacklist);
  }
}
