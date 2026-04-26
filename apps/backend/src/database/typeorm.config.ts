import 'dotenv/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { UserAccountEntity } from '../accounts/entities/user-account.entity';

const dbPort = Number.parseInt(process.env.DB_PORT ?? '5432', 10);

const baseOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number.isNaN(dbPort) ? 5432 : dbPort,
  username: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  database: process.env.DB_NAME ?? 'template_app',
  entities: [UserAccountEntity],
  migrations: ['src/database/migrations/*{.ts,.js}', 'dist/database/migrations/*{.ts,.js}'],
  synchronize: false,
};

export const typeOrmDataSourceOptions: DataSourceOptions = baseOptions;

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  ...baseOptions,
  autoLoadEntities: true,
};
