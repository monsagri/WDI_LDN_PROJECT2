// Get the User model
const User = require('../models/user');

// render the registration page
function newRoute(req, res) {
  res.render('registrations/new');
}

// input new value into user database and render the main page again
function createRoute(req, res) {
  User.create(req.body)
    .then(() => res.redirect('cinemas/'));
}
module.exports = {
  new: newRoute,
  create: createRoute
};
