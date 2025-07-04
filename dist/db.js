"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const product_entity_1 = require("./models/product.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost', // Update as needed
    port: 5432, // Default PostgreSQL port
    username: 'postgres', // Update as needed
    password: 'admin', // Update as needed
    database: 'ecommerce', // Update as needed
    synchronize: true, // Set to false in production
    logging: false,
    entities: [product_entity_1.Product],
    migrations: [],
    subscribers: [],
});
