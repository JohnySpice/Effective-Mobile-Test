import { DataSource, DataSourceOptions } from 'typeorm';
import { resolve } from 'path';
import 'dotenv/config';
const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DATABASE,
} = process.env;

export const dbConfig: DataSourceOptions = {
  type: 'postgres',

  host: POSTGRES_HOST,
  port: parseInt(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DATABASE,

  entities: [resolve(__dirname, '../**/entities/*.entity.{js,ts}')],

  migrations: [resolve(__dirname, '../migrations/*.{ts,js}')],
};
export default new DataSource(dbConfig);
