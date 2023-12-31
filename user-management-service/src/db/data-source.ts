import { DataSource, DataSourceOptions } from 'typeorm';
import { resolve } from 'path';

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = process.env;

export const dbConfig: DataSourceOptions = {
  type: 'postgres',

  host: POSTGRES_HOST,
  port: parseInt(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,

  entities: [resolve(__dirname, '../**/entities/*.entity.{js,ts}')],

  migrations: [resolve(__dirname, '../migrations/*.{ts,js}')],
};
export default new DataSource(dbConfig);
