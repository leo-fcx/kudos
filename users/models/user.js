let mongoose = require('mongoose');
let mongoosastic = require('mongoosastic')

let userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  kudosQty: {
    type: Number,
    required: true,
    default: 0
  },
  create_date: {
    type: Date,
    default: Date.now
  }
});

userSchema.plugin(mongoosastic);

let User = module.exports = mongoose.model('user', userSchema);

module.exports.get = function (callback, limit) {
  User.find(callback).limit(limit);
}