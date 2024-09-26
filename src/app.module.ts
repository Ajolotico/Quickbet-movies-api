import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './domain/db/orm.config';
import { EntitiesModule } from './domain/entities/entities.module';
import { JwtMiddleware } from './domain/shared/middleware/jwt.middleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    EntitiesModule,
    JwtModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtMiddleware],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes(
      {
        path: 'users',
        method: RequestMethod.ALL,
      },
      {
        path: 'users/*',
        method: RequestMethod.ALL,
      },
      {
        path: 'favorites/*',
        method: RequestMethod.ALL,
      },
      {
        path: 'favorites',
        method: RequestMethod.ALL,
      },
    );
  }
}
