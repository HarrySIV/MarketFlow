import { Router } from 'express';

import { createProduct, getProducts } from '../controllers/product-controller';

const router = Router();

router.post('/create-product', createProduct);
router.get('/', getProducts);

// router.put();
// router.delete();

module.exports = router;
