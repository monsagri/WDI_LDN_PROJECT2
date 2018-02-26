// Get the User model
const User = require('../models/user');

// render the login form
function showRoute(req, res) {
  res.render('sessions/new');
}

// post form input and login if it matches
function loginRoute(req, res) {
  User.findOne(req.body.name)
    .then(user => console.log(user))
    .then(() => res.redirect('cinemas/'));
}
module.exports = {
  show: showRoute,
  login: loginRoute
};
