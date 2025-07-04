import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import multer from 'multer';

const router = Router();
const controller = new ProductController();
const upload = multer({ dest: 'uploads/' });

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/', upload.array('images'), controller.create);
router.put('/:id', upload.array('images'), controller.update);
router.delete('/:id', controller.delete);

export default router; 