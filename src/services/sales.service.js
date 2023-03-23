const { salesModel } = require('../models');
const { validateSaleQuantity,
        validateProducts,
        validSaleOnDB } = require('../validations/validate.products');

const newSale = async (sales) => {
  const error = validateSaleQuantity(sales);
  if (error.type) return error;

  const notHaveProductOnDB = await validateProducts(sales);
  if (notHaveProductOnDB.type) return notHaveProductOnDB;
    
  const res = await salesModel.newSale(sales);
  if (res === undefined) {
    return { type: 'DATABASE_ERROR', message: 'Erro ao adicionar venda ao banco' };
  }

  return { type: null, message: res };
};

const getAll = async () => {
  const sales = await salesModel.getAll();
  if (!sales) return { type: 'SERVER_ERROR', message: 'Cannot get sales' };
  return { type: null, message: sales };
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);
  if (!sale || !sale.length) return { type: 'NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: sale };
};

const updateSale = async (id, sale) => {
  const error = validateSaleQuantity(sale);
  if (error.type) return error;

  const notHaveProductOnDB = await validateProducts(sale);
  if (notHaveProductOnDB.type) return notHaveProductOnDB;

  const notHaveSaleOnDB = await validSaleOnDB(id);
  console.log(notHaveSaleOnDB);
  if (notHaveSaleOnDB.type) return notHaveSaleOnDB;

  const saleUpdated = await salesModel.updateSale(id, sale);
  if (!saleUpdated) return { type: 'SERVER_ERROR', message: saleUpdated };
  return { type: null, message: saleUpdated };
};

module.exports = {
  newSale,
  getAll,
  getById,
  updateSale,
};