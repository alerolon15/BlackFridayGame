const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const counterSchema = Schema({
    contador: { type:String, unique:true },
    seq: { type: Number, default: 0 }
});

module.exports = mongoose.model('Counter', counterSchema);
