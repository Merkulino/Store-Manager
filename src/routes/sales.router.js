const express = require('express');
const { salesController } = require('../controllers');
const validation = require('../middlewares/validations');

const router = express.Router();

router.get('/',
  // validation.newSale,
  salesController.listSales);

router.get('/:id',
  // validation.newSale,
  salesController.findSale);

router.post('/',
  validation.newSale,
  salesController.newSale);

router.put('/:id',
  validation.newSale,
  salesController.updateSale);

router.delete('/:id',
  salesController.deleteSale);

module.exports = router;