const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const commentSchema = new mongoose.Schema({
  rating: { type: Number, min: 0, max: 5, required: true },
  content: {type: String},
  user: { type: mongoose.Schema.ObjectId, ref: 'User'}
});

const schema = new mongoose.Schema({
  username: { type: String, required: true },
  avatar: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  comments: [commentSchema]
});

// Add the virtual for passwordConfirmation
schema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

// set up a pre-validate hook
schema.pre('validate', function checkPassword(next) {
  // check if the password has been modified and if so whether the password and the passwordConfirmation match
  // if not, invalidate the passwordConfirmation, so that the validations fail
  if(this.isModified('password') && this._passwordConfirmation !== this.password) this.invalidate('passwordConfirmation', 'does not match');

  // otherwise continue to the next step (validation)
  next();
});

schema.pre('save', function hashPassword(next) {
  // if the password has been modified, it needs to be hashed
  if(this.isModified('password')) {
    // hash the password with bcrypt and store the hashed password on the user object
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }

  // continue to the next step (save)
  next();
});

// compareSync compares a plain text password against the hashed one stored on the user object
schema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', schema);
