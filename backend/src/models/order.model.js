const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
    validate: {
      validator: function (v) {
        return mongoose.Types.ObjectId.isValid(v);
      },
    },
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
    validate: {
      validator: function (v) {
        return mongoose.Types.ObjectId.isValid(v);
      },
    },
  },
  amount: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return /^[0-9a-z]{1,20}$/.test(v);
      },
    },
  },
  status: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^completed|in progress|cancelled$/.test(v);
      },
    },
  }
});

module.exports = mongoose.model('Order', orderSchema);
