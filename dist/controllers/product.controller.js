"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const db_1 = require("../db");
const product_entity_1 = require("../models/product.entity");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// Add this line before your routes
app.use((0, cors_1.default)({
    origin: 'http://localhost:4200'
}));
class ProductController {
    constructor() {
        this.productRepository = db_1.AppDataSource.getRepository(product_entity_1.Product);
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const products = yield this.productRepository.find();
            const productsWithImageUrls = products.map((product) => {
                var _a;
                return (Object.assign(Object.assign({}, product), { images: ((_a = product.images) === null || _a === void 0 ? void 0 : _a.map((img) => img.startsWith('http') ? img : `http://localhost:3000/uploads/${img.replace(/^uploads[\\\/]/, '')}`)) || [] }));
            });
            res.json(productsWithImageUrls);
        });
        this.getOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const product = yield this.productRepository.findOneBy({ id: Number(req.params.id) });
            if (!product) {
                res.status(404).json({ message: 'Product not found' });
                return;
            }
            const productWithImageUrls = Object.assign(Object.assign({}, product), { images: ((_a = product.images) === null || _a === void 0 ? void 0 : _a.map((img) => img.startsWith('http') ? img : `http://localhost:3000/uploads/${img.replace(/^uploads[\\\/]/, '')}`)) || [] });
            res.json(productWithImageUrls);
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { sku, name, price } = req.body;
            let images = [];
            if (req.files && Array.isArray(req.files)) {
                images = req.files.map((file) => file.filename.replace(/^uploads[\\\/]/, ''));
            }
            try {
                const product = this.productRepository.create({ sku, name, price, images });
                yield this.productRepository.save(product);
                // Return product with image URLs
                const productWithImageUrls = Object.assign(Object.assign({}, product), { images: ((_a = product.images) === null || _a === void 0 ? void 0 : _a.map((img) => img.startsWith('http') ? img : `http://localhost:3000/uploads/${img.replace(/^uploads[\\\/]/, '')}`)) || [] });
                res.status(201).json(productWithImageUrls);
            }
            catch (error) {
                res.status(400).json({ message: 'Error creating product', error });
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { id } = req.params;
            const { sku, name, price } = req.body;
            let images = [];
            if (req.files && Array.isArray(req.files)) {
                images = req.files.map((file) => file.filename.replace(/^uploads[\\\/]/, ''));
            }
            else if (req.body.images) {
                images = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
                images = images.map((img) => img.replace(/^uploads[\\\/]/, ''));
            }
            try {
                const product = yield this.productRepository.findOneBy({ id: Number(id) });
                if (!product) {
                    res.status(404).json({ message: 'Product not found' });
                    return;
                }
                product.sku = sku;
                product.name = name;
                product.price = price;
                product.images = images;
                yield this.productRepository.save(product);
                // Return product with image URLs
                const productWithImageUrls = Object.assign(Object.assign({}, product), { images: ((_a = product.images) === null || _a === void 0 ? void 0 : _a.map((img) => img.startsWith('http') ? img : `http://localhost:3000/uploads/${img.replace(/^uploads[\\\/]/, '')}`)) || [] });
                res.json(productWithImageUrls);
            }
            catch (error) {
                res.status(400).json({ message: 'Error updating product', error });
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const result = yield this.productRepository.delete(Number(id));
                if (result.affected === 0) {
                    res.status(404).json({ message: 'Product not found' });
                    return;
                }
                res.json({ message: 'Product deleted' });
            }
            catch (error) {
                res.status(400).json({ message: 'Error deleting product', error });
            }
        });
    }
}
exports.ProductController = ProductController;
