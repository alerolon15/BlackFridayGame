const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let clientSchema = new Schema({
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  phone: {type: String},
  mail: {type: String, unique: true, required: true},
  discountCount: {type: Number}
});

module.exports = mongoose.model('Client', clientSchema);
