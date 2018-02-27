// 3rd party stuff
// require mongoose to work on database
const mongoose = require('mongoose');
// set mongoose to use bluebird for promises
mongoose.Promise = require('bluebird');

// // get the cinema model
// const Cinema = require('../models/cinema');
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
      // if the user is an admin store that as well
      if(user.admin) req.session.isAdmin = true;
      //
      // req.flash('success', `Welcome back ${user.username}!`);
      res.redirect('/cinemas');
    })
    .catch(next);
}

function myProfileRoute(req, res) {
  User.findOne(req.currentUser._id)
    .populate('comments.cinema')
    .populate('comments.user')
    .then(user => {
      res.render('sessions/myProfile', { user });
    });
}

function addFavoriteRoute(req, res) {
  res.redirect(`/cinemas/${req.params.id}`);
}

// This is some advanced magic shit

// function moderationRoute(req, res) {
//   console.log(Cinema.find(
//     { comments: { $exists: true } } ));
//   const unapprovedComments = [];
//   // Search through all cinema records
//   Cinema.find(
//     { comments: { $exists: true } } ).forEach(cinema => {
//     // find comments within the record that are not approced and add them to the unapprovedComments array
//     cinema.comments.filter(comment => comment.approved !== true).forEach(comment => {
//       unapprovedComments.push(comment);
//     });
//   })
//     .then(res.render('sessions/moderation', { unapprovedComments }));
//
// }

function logoutRoute(req, res) {
  req.session.regenerate(() => res.redirect('/'));
}

module.exports = {
  show: showRoute,
  login: loginRoute,
  myProfile: myProfileRoute,
  addFavorite: addFavoriteRoute,
  // moderation: moderationRoute,
  logout: logoutRoute
};
