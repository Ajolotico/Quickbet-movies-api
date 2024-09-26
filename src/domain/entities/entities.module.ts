import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BlacklistModule } from './blacklist/blacklist.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [UsersModule, AuthModule, BlacklistModule, FavoritesModule],
  providers: [],
  exports: [BlacklistModule],
})
export class EntitiesModule {}
