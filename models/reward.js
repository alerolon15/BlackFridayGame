const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let rewardSchema = new Schema({
  id: {type: String, unique: true},
  commerce: {type: String, required: true},
  //stock = mount
  mount: {type: Number},
  discountText: {type: String, required: true}
});

module.exports = mongoose.model('Reward', rewardSchema);
