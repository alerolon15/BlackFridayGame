var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  nombre: {type: String, required: true},
  apellido: {type: String, required: true},
  urlImagen: {type: String},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  esAdmin: {type: Boolean, default: false},
  BackOffice: {type: Boolean, default: false}
});

module.exports = mongoose.model('User', userSchema);
