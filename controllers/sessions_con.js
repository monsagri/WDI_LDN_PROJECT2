// Get the User model
const User = require('../models/user');

// render the login form
function showRoute(req, res) {
  res.render('sessions/new');
}

// post form input and login if it matches
function loginRoute(req, res, next) {
  User.findOne({email: req.body.email})
    .then(user => {
      if(!user || !user.validatePassword(req.body.password)){
        return res.redirect('/login');
      }
      //store the logged in user's Id into the session cookie
      req.session.userId = user._id;
      //
      // req.flash('success', `Welcome back ${user.username}!`);
      res.redirect('/cinemas');
    })
    .catch(next);
}

function logoutRoute(req, res) {
  req.session.regenerate(() => res.redirect('/'));
}

module.exports = {
  show: showRoute,
  login: loginRoute,
  logout: logoutRoute
};
