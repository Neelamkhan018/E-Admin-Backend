import { Request, Response, RequestHandler } from 'express';
import { AppDataSource } from '../db';
import { Product } from '../models/product.entity';
import express from 'express';
import cors from 'cors';

const app = express();

// Add this line before your routes
app.use(cors({
  origin: 'http://localhost:4200'
}));

export class ProductController {
  private productRepository = AppDataSource.getRepository(Product);

  getAll: RequestHandler = async (req, res) => {
    const products = await this.productRepository.find();
    const productsWithImageUrls = products.map((product: any) => ({
      ...product,
      images: product.images?.map((img: string) =>
        img.startsWith('http') ? img : `http://localhost:3000/uploads/${img.replace(/^uploads[\\\/]/, '')}`
      ) || []
    }));
    res.json(productsWithImageUrls);
  };

  getOne: RequestHandler = async (req, res) => {
    const product = await this.productRepository.findOneBy({ id: Number(req.params.id) });
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    const productWithImageUrls = {
      ...product,
      images: product.images?.map((img: string) =>
        img.startsWith('http') ? img : `http://localhost:3000/uploads/${img.replace(/^uploads[\\\/]/, '')}`
      ) || []
    };
    res.json(productWithImageUrls);
  };

  create: RequestHandler = async (req, res) => {
    const { sku, name, price } = req.body;
    let images: string[] = [];
    if (req.files && Array.isArray(req.files)) {
      images = req.files.map((file: any) => file.filename.replace(/^uploads[\\\/]/, ''));
    }
    try {
      const product = this.productRepository.create({ sku, name, price, images });
      await this.productRepository.save(product);
      // Return product with image URLs
      const productWithImageUrls = {
        ...product,
        images: product.images?.map((img: string) =>
          img.startsWith('http') ? img : `http://localhost:3000/uploads/${img.replace(/^uploads[\\\/]/, '')}`
        ) || []
      };
      res.status(201).json(productWithImageUrls);
    } catch (error) {
      res.status(400).json({ message: 'Error creating product', error });
    }
  };

  update: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { sku, name, price } = req.body;
    let images: string[] = [];
    if (req.files && Array.isArray(req.files)) {
      images = req.files.map((file: any) => file.filename.replace(/^uploads[\\\/]/, ''));
    } else if (req.body.images) {
      images = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
      images = images.map((img: string) => img.replace(/^uploads[\\\/]/, ''));
    }
    try {
      const product = await this.productRepository.findOneBy({ id: Number(id) });
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }
      product.sku = sku;
      product.name = name;
      product.price = price;
      product.images = images;
      await this.productRepository.save(product);
      // Return product with image URLs
      const productWithImageUrls = {
        ...product,
        images: product.images?.map((img: string) =>
          img.startsWith('http') ? img : `http://localhost:3000/uploads/${img.replace(/^uploads[\\\/]/, '')}`
        ) || []
      };
      res.json(productWithImageUrls);
    } catch (error) {
      res.status(400).json({ message: 'Error updating product', error });
    }
  };

  delete: RequestHandler = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await this.productRepository.delete(Number(id));
      if (result.affected === 0) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }
      res.json({ message: 'Product deleted' });
    } catch (error) {
      res.status(400).json({ message: 'Error deleting product', error });
    }
  };
}