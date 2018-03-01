// 3rd party stuff
// require mongoose to work on database
const mongoose = require('mongoose');
// set mongoose to use bluebird for promises
mongoose.Promise = require('bluebird');

// // get the cinema model
// const Cinema = require('../models/cinema');
// Get the User model
const User = require('../models/user');
// get the cinema model
const Cinema = require('../models/cinema');
// Get the counter model
const Counter = require('../models/counter');
// keep
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
    .populate('favorites')
    .then(user => {
      res.render('sessions/myProfile', { user });
    });
}

function addFavoriteRoute(req, res) {
  Cinema.findById(req.params.id)
    .then(cinema => {
      cinema.favoritedBy.push(req.currentUser._id);
      return cinema.save();
    });
  User.findById(req.currentUser._id)
    .then(user => {
      user.favorites.push(req.params.id);
      return user.save();
    });
  res.redirect(`/cinemas/${req.params.id}`);
}

function unFavoriteRoute(req, res) {
  Cinema.findById(req.params.id)
    .then(cinema => {
      const index = cinema.favoritedBy.indexOf(req.currentUser._id);
      cinema.favoritedBy.splice(index, 1);
      return cinema.save();
    });
  User.findById(req.currentUser._id)
    .then(user => {
      const index = user.favorites.indexOf(req.params.id);
      user.favorites.splice(index, 1);
      return user.save();
    });
  res.redirect(`/cinemas/${req.params.id}`);
}

function moderationRoute(req, res) {
  Cinema.find({ 'comments.approved': false })
    .populate('comments.cinema')
    .populate('comments.user')
    .then(cinemas => {

      const unapprovedComments = cinemas
        .map(cinema => cinema.comments)
        .reduce((flattened, comments) => flattened.concat(comments), [])
        .filter(comment => !comment.approved);

      res.render('sessions/moderation', { unapprovedComments });
    });
}

function moderatorApproveRoute(req, res) {
  // extract the cinema id from the url using magic
  const cinemaId = req.url.replace(/moderation|cinemas|\/|comments.*|'|"/g,'');
  Cinema.findById(cinemaId)
    .then(cinema => {
      const comment = cinema.comments.id(req.params.id);
      comment.approved = true;
      return cinema.save();
    })
    .then(() => {
      Counter.findOne()
        .then(counter => {
          console.log(counter);
          counter.comments--;
          console.log(counter);
          counter.save();
        });
    });
  res.redirect('/moderation');
}
function moderatorDeleteRoute(req, res) {
  const cinemaId = req.url.replace(/moderation|cinemas|\/|comments.*|'|"/g,'');
  Cinema.findById(cinemaId)
    .then(cinema => {
      const comment = cinema.comments.id(req.params.id);
      comment.remove();
      return cinema.save();
    })
    .then(() => {
      Counter.findOne()
        .then(counter => {
          console.log(counter);
          counter.comments--;
          console.log(counter);
          counter.save();
        });
    });
  res.redirect('/moderation');
}

function logoutRoute(req, res) {
  req.session.regenerate(() => res.redirect('/'));
}

module.exports = {
  show: showRoute,
  login: loginRoute,
  myProfile: myProfileRoute,
  favorite: addFavoriteRoute,
  unFavorite: unFavoriteRoute,
  moderation: moderationRoute,
  moderatorApprove: moderatorApproveRoute,
  moderatorDelete: moderatorDeleteRoute,
  logout: logoutRoute
};
