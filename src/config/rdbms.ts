import { ConnectionOptions } from 'typeorm';
import { environment, DB_INFO } from './app.config';

/**
 * Uses env params to configure TypeORM database library
 */
const config: ConnectionOptions = {
  type: 'postgres',
  host: DB_INFO.POSTGRES_HOST,
  port: Number(DB_INFO.POSTGRES_PORT),
  username: DB_INFO.POSTGRES_USER,
  password: DB_INFO.POSTGRES_PASSWORD,
  database: DB_INFO.POSTGRES_DB,
  extra: environment == 'production' ? { max: 10, min: 5 } : { max: 5, min: 3 }, // connection pool
  synchronize: false,
  migrationsRun: environment === 'production' || environment === 'test',
  entities: [__dirname + '../../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '../../**/migrations/*{.ts,.js}'],
  subscribers: [__dirname + '../../**/subscribers/*.subscriber{.ts,.js}'],
  cli: {
    migrationsDir: 'src/database/migrations',
    entitiesDir: 'src/database/entities'
  },
  logging: false
};

export = config;
