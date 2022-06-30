const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
  zip: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return /^[0-9]{1,4}$/.test(v);
      },
    },
  },
  city: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-ZÁÉÍÓÖŐÚÜŰáéíóöőúüű\.]{1,30}$/.test(v);
      },
    },
  },
  street: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[0-9a-zA-ZÁÉÍÓÖŐÚÜŰáéíóöőúüű \/\.]{1,30}$/.test(v);
      },
    },
  },
});

module.exports = mongoose.model('Address', addressSchema);
