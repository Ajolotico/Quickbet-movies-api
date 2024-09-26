import { DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: true,
  metadataTableName: 'orm_metadata',
  extra: {
    namedPlaceholders: true,
    charset: 'utf8mb4_unicode_520_ci',
  },
  entities: [`${__dirname}/../entities/**/*.entity{.ts,.js}`],
};
