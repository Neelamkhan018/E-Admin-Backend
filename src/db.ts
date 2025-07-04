import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Product } from './models/product.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost', // Update as needed
  port: 5432, // Default PostgreSQL port
  username: 'postgres', // Update as needed
  password: 'admin', // Update as needed
  database: 'ecommerce', // Update as needed
  synchronize: true, // Set to false in production
  logging: false,
  entities: [Product],
  migrations: [],
  subscribers: [],
}); 