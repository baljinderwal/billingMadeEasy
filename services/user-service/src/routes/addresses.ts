import express from 'express';
import { AddressController } from '../controllers/AddressController';
import { authenticateToken, validateBody, validateParams, idParamSchema } from '@billing/middleware';
import { addressValidation } from '@billing/utils';

const router = express.Router();

router.get('/', authenticateToken, AddressController.getAddresses);
router.post('/', authenticateToken, validateBody(addressValidation.create), AddressController.createAddress);
router.put('/:id', authenticateToken, validateParams(idParamSchema), validateBody(addressValidation.create), AddressController.updateAddress);
router.delete('/:id', authenticateToken, validateParams(idParamSchema), AddressController.deleteAddress);
router.put('/:id/default', authenticateToken, validateParams(idParamSchema), AddressController.setDefaultAddress);

export default router;
