import 'dotenv/config';
import { DataSource } from 'typeorm';
import { dbConfig } from './config.js';

export default new DataSource(dbConfig);
