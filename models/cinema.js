const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String, minlength: 2, required: true },
  rating: { type: Number, min: 0, max: 5, required: true },
  location: { type: String, minlength: 5, required: true },
  screens: { type: Number },
  restaurant: { type: Boolean },
  alcohol: { type: Boolean },
  parking: { type: Boolean },
  wheelchair: { type: Boolean },
  ost: { type: Boolean },
  images: [{
    content: String
  }],
  comments: [{
    content: String
  }]
});

module.exports = mongoose.model('Cinema', schema);
