import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { User } from '../users/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  private mainRepo: Repository<Favorite>;
  constructor(private dataSource: DataSource) {
    this.mainRepo = dataSource.getRepository(Favorite);
  }

  async add(id: string, user: User) {
    const exist = await this.mainRepo.findOne({
      where: {
        movie_id: +id,
        user_id: user.user_id,
      },
    });

    if (exist && exist.is_active) return exist;

    let save: Favorite = null;
    if (exist && !exist.is_active) {
      await this.mainRepo.update(
        {
          movie_id: +id,
          user_id: user.user_id,
        },
        {
          is_active: true,
        },
      );
      save.is_active = true;
    } else {
      save = await this.mainRepo.save({
        user_id: user.user_id,
        movie_id: +id,
      });
    }

    return save;
  }

  async findAll(user: User) {
    return this.mainRepo.find({
      where: {
        user_id: user.user_id,
        is_active: true,
      },
    });
  }

  async findOne(id: number, user: User) {
    return this.mainRepo.findOne({
      where: {
        movie_id: id,
        user_id: user.user_id,
        is_active: true,
      },
    });
  }

  async remove(id: number, user: User) {
    return this.mainRepo.update(
      {
        movie_id: id,
        user_id: user.user_id,
      },
      {
        is_active: false,
      },
    );
  }
}
