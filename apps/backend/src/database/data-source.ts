import 'dotenv/config';
import { DataSource } from 'typeorm';
import { typeOrmDataSourceOptions } from './typeorm.config';

const dataSource = new DataSource(typeOrmDataSourceOptions);

export default dataSource;
