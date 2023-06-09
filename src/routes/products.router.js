const express = require('express');
const { productsController } = require('../controllers');
const validation = require('../middlewares/validations');

const router = express.Router();

router.get('/search', productsController.searchProduct);

router.get('/', productsController.getAll);

router.get('/:id', productsController.getById);

router.post('/',
  validation.newProduct,
  productsController.newProduct);

router.put('/:id',
  validation.newProduct,
  productsController.updateProduct);

router.delete('/:id', productsController.deleteProduct);

module.exports = router;