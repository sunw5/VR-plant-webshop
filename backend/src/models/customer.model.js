const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
  lastName: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű]+$/.test(v);
      },
    },
  },
  firstName: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű]+$/.test(v);
      },
    },
  },
  addressBillId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: true,
    validate: {
      validator: function (v) {
        return mongoose.Types.ObjectId.isValid(v);
      },
    },
  },
  addressShipId: {  
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: false,
    validate: {
      validator: function (v) {
        return mongoose.Types.ObjectId.isValid(v);
      },
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[\w\.]+@([\w-]+\.)+.[\w-]{2,6}$/.test(v);
      },
    },
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[0-9 \+]+$/.test(v);
      },
    },
  },
});

module.exports = mongoose.model('Customer', customerSchema);