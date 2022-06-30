const express = require('express');
const router = express.Router();

const roleGuard = require('../auth/roleGuard');
const orderModel = require('../../models/order.model');
const controller = require('../base/controller')(orderModel, [{path: 'productId', select: ["Magyar név"]}, {path: 'customerId', select: ['lastName', 'firstName']} ]);

router.post('/', roleGuard(2), (req, res, next) => {
  return controller.create(req, res, next);
});

router.get('/', (req, res, next) => {
  return controller.findAll(req, res, next);
});

router.get('/:id', (req, res, next) => {
  return controller.findOne(req, res, next);
});

router.put('/:id', roleGuard(2), (req, res, next) => {
  return controller.update(req, res, next);
});

router.patch('/:id', roleGuard(2), (req, res, next) => {
  return controller.update(req, res, next);
});

router.delete('/:id', roleGuard(3), (req, res, next) => {
  return controller.delete(req, res, next);
});

module.exports = router;

