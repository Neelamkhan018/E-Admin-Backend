// import 'reflect-metadata';
// import { DataSource } from 'typeorm';
// import { Product } from './models/product.entity';

// export const AppDataSource = new DataSource({
//   type: 'postgres',
//   host: 'localhost', // Update as needed
//   port: 5432, // Default PostgreSQL port
//   username: 'postgres', // Update as needed
//   password: 'admin', // Update as needed
//   database: 'ecommerce', // Update as needed
//   synchronize: true, // Set to false in production
//   logging: false,
//   entities: [Product],
//   migrations: [],
//   subscribers: [],
// }); 



import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Product } from './models/product.entity';
import dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Product],
  migrations: [],
  subscribers: [],
});
