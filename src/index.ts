import express from 'express';
import bodyParser from 'body-parser';
import { AppDataSource } from './db';
import productRoutes from './routes/product.routes';
import cors from 'cors';
import path from 'path';

const app = express();
const PORT = 3000;

app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors({
  origin: ['http://localhost:4200', 'https://e-admin-dashboard.netlify.app']
}));


app.use('/api/products', productRoutes);
app.use('/uploads', express.static(path.join(__dirname, '../uploads'))); // serve uploads from backend/uploads


AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log('TypeORM connection error: ', error));