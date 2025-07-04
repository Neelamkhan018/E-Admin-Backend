"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
const controller = new product_controller_1.ProductController();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/', upload.array('images'), controller.create);
router.put('/:id', upload.array('images'), controller.update);
router.delete('/:id', controller.delete);
exports.default = router;
