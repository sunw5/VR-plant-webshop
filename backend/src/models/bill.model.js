const mongoose = require('mongoose');

const billSchema = mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
    validate: {
      validator: function (v) {
        return mongoose.Types.ObjectId.isValid(v);
      },
    },
  },
  price: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return /^[1-9]{1,1}[0-9]{0,20}$/.test(v);
      },
    },
  },
  status: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^új|teljesítve|stornózott$/.test(v);
      },
    },
  },
});

module.exports = mongoose.model('Bill', billSchema);
