const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const configuracionSchema = Schema({
    id: { type: String, unique:true  },
    configuracion: { type: Array }
});

module.exports = mongoose.model('Configuracion', configuracionSchema);
