const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  'Magyar név': {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű]{1,20}( [A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű]{1,20}){0,5}$/.test(
          v
        );
      },
    },
  },
  'Elérhető': {
    type: Boolean,
    required: true,
  },
  'Ár': {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return /^[1-9][0-9]{0,20}$/.test(v);
      },
    },
  },
  'Latin név': {
    type: String,
    required: false,
    validate: {
      validator: function (v) {
        return /^^[A-Za-z]{0,20}( [A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű\-\.\']{1,20}){0,5}$/.test(v);
      },
    },
  },
  'Fényigény': {
    type: String,
    required: false,
    validate: {
      validator: function (v) {
        return /^[A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű]{0,20}( [A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű]{1,20}){0,50}$/.test(
          v
        );
      },
    },
  },
  'Tenyészidő': {
    type: String,
    required: false,
    validate: {
      validator: function (v) {
        return /^[0-9A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű]{0,20}( [0-9A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű]{1,20}){0,50}$/.test(
          v
        );
      },
    },
  },
  'Talajigény': {
    type: String,
    required: false,
    validate: {
        validator: function (v) {
          return /^[0-9A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű,\.]{0,20}( [0-9A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű,\.]{1,20}){0,50}$/.test(
            v
          );
        },
      },
  },
  'Habitus': {
    type: String,
    required: false,
    validate: {
        validator: function (v) {
          return /^[0-9A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű]{0,20}( [0-9A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű]{1,20}){0,50}$/.test(
            v
          );
        },
      },
  },
  'Teljes magasság': {
    type: String,
    required: false,
    validate: {
        validator: function (v) {
          return /^[0-9A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű\-,]{0,20}( [0-9A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű\-,]{1,20}){0,50}$/.test(
            v
          );
        },
      },
  },
  'Kiszerelés': {
    type: String,
    required: false,
    validate: {
        validator: function (v) {
          return /^[0-9A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű]{0,20}( [0-9A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű]{1,20}){0,50}$/.test(
            v
          );
        },
      },
  },
  'Virágzás ideje': {
    type: String,
    required: false,
    validate: {
        validator: function (v) {
          return /^[0-9A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű-]{0,20}( [0-9A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű-]{0,20}){0,50}$/.test(
            v
          );
        },
      },
  },
  'Virág színe': {
    type: String,
    required: false,
    validate: {
        validator: function (v) {
          return /^[A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű]{0,20}( [0-9A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű]{0,20}){0,50}$/.test(
            v
          );
        },
      },
  },
  'Egyéb': {
    type: String,
    required: false,
    validate: {
        validator: function (v) {
          return /^[0-9A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű,-\.]{0,20}( [0-9A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű,-\.]{1,20}){0,100}$/.test(
            v
          );
        },
      },
  },
});

module.exports = mongoose.model('Product', ProductSchema);
