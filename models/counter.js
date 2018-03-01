const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  comments: { type: Number, default: 0 },
  cinemas: { type: Number, default: 0 },
  movies: { type: Number, default: 0 }
});

module.exports = mongoose.model('counter', schema);
