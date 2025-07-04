"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = require("./db");
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(body_parser_1.default.json({ limit: '10mb' }));
app.use((0, cors_1.default)({ origin: 'http://localhost:4200' }));
app.use('/api/products', product_routes_1.default);
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads'))); // serve uploads from backend/uploads
db_1.AppDataSource.initialize()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
    .catch((error) => console.log('TypeORM connection error: ', error));
