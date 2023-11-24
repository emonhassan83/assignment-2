import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();


router.put('/:userId/orders', ProductControllers.addProductToOrder );
router.get('/:userId/orders', ProductControllers.getOrdersForUser );
router.get('/:userId/orders/total-price', ProductControllers.calculateTotalPriceForUser)

export const ProductRoute = router;