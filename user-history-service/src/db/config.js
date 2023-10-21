import 'dotenv/config';
import { UserHistoryEntity, UserEntity } from '../entity/index.js';
const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DATABASE,
} = process.env;

export const dbConfig = {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: parseInt(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DATABASE,
  entities: [UserHistoryEntity, UserEntity],
  migrations: [process.env.PWD + '/src/migrations/*.js'],
};
