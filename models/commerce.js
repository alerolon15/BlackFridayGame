const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let commerceSchema = new Schema({
  nombre: {type: String, unique: true},
  address: {type: String, required: true},
  discounts: {type: Number}
});

module.exports = mongoose.model('Commerce', commerceSchema);
