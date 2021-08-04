const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let rewardSchema = new Schema({
  rewardName: {type: String, unique: true},
  commerce: {type: String, required: true},
  commerceAdress: {type: String, required: true},
  //stock = mount
  urlImage: {type: String},
  mount: {type: Number},
  discountText: {type: String, required: true}
});

module.exports = mongoose.model('Reward', rewardSchema);
