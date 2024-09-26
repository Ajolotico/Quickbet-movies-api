import { Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { SearchRequest } from '../../shared/decorators/search-request.decorator';
import { User } from '../users/entities/user.entity';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @ApiParam({ name: 'id', type: 'string' })
  @Post('add/:id')
  add(@Param('id') id: string, @SearchRequest('user') user: User) {
    return this.favoritesService.add(id, user);
  }

  @Get()
  findAll(@SearchRequest('user') user: User) {
    return this.favoritesService.findAll(user);
  }

  @ApiParam({ name: 'id', type: 'string' })
  @Get(':id')
  findOne(@Param('id') id: string, @SearchRequest('user') user: User) {
    return this.favoritesService.findOne(+id, user);
  }

  @ApiParam({ name: 'id', type: 'string' })
  @Delete(':id')
  remove(@Param('id') id: string, @SearchRequest('user') user: User) {
    return this.favoritesService.remove(+id, user);
  }
}
