const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  rating: { type: Number, min: 0, max: 5, required: true },
  content: {type: String},
  user: { type: mongoose.Schema.ObjectId, ref: 'User'},
  cinema: { type: String},
  approved: { type: Boolean }
});

commentSchema.methods.isOwnedBy = function(user){
  return this.user._id && user._id.equals(this.user._id);
};

const schema = new mongoose.Schema({
  name: { type: String, minlength: 2, required: true },
  originalRating: { type: Number, min: 0, max: 5, required: true },
  rating: { type: Number},
  location: { type: String, minlength: 5, required: true },
  image: { type: String, required: true },
  screens: { type: Number },
  restaurant: { type: Boolean },
  alcohol: { type: Boolean },
  parking: { type: Boolean },
  wheelchair: { type: Boolean },
  ost: { type: Boolean },
  userimages: [{
    content: String
  }],
  description: { type: String, required: true },
  comments: [commentSchema],
  favoritedBy: []
});

schema.virtual('averageRating')
  .get(function calculateRating() {
    let currentRating = this.originalRating;
    this.comments.forEach(comment => {
      currentRating += comment.rating;
    });
    currentRating = currentRating / (this.comments.length + 1);
    return currentRating;
  });

// Rating should be included in comments in order to allow removing individual ratings
module.exports = mongoose.model('Cinema', schema);
