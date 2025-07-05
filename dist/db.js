"use strict";
// import 'reflect-metadata';
// import { DataSource } from 'typeorm';
// import { Product } from './models/product.entity';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
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
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const product_entity_1 = require("./models/product.entity");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: false,
    entities: [product_entity_1.Product],
    migrations: [],
    subscribers: [],
});
