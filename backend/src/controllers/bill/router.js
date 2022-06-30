const express = require('express');
const router = express.Router();

const roleGuard = require('../auth/roleGuard');
const billModel = require('../../models/bill.model');
const controller = require('../base/controller')(billModel, [{path: 'orderId', select: ["amount"]} ]);

router.post('/', roleGuard(2), (req, res, next) => {
  return controller.create(req, res, next);
});

router.get('/', roleGuard(2), (req, res, next) => {
  return controller.findAll(req, res, next);
});

router.get('/:id', roleGuard(2), (req, res, next) => {
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

