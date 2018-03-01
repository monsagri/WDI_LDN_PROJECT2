// get the cinema model
const Cinema = require('../models/cinema');
// Get the User model
const User = require('../models/user');
// Get the counter model
const Counter = require('../models/counter');



// rendering the cinema index
function indexRoute(req, res) {
  Cinema.find()
    .then(cinemas => res.render('cinemas/index', { cinemas } ));
}

// rendering the new route
function newRoute(req, res) {
  res.render('cinemas/new');
}

// rendering the create route
function createRoute(req, res, next) {
  Cinema.create(req.body)
    .then(() => res.redirect('cinemas/'))
    .catch(next);
}

// rendering the show Route
function showRoute(req, res, next) {
  Cinema.findById(req.params.id)
    //turns username id into username
    .populate('comments.user')
    .then(cinema => {
      if(!cinema) return res.render('pages/404');
      res.render('cinemas/show', {cinema});
    })
    .catch(next);
}

// rendering the edit route
function editRoute(req, res) {
  Cinema.findById(req.params.id)
    .then(cinema => res.render('cinemas/edit', { cinema }));
}
// rendering the update route
function updateRoute(req, res) {
  Cinema.findById(req.params.id)
    .then(cinema => Object.assign(cinema, req.body))
    .then(cinema => cinema.save())
    .then(() => res.redirect(`/cinemas/${req.params.id}`));
}

// rendering the DeleteRoute
function deleteRoute(req, res) {
  Cinema.findById(req.params.id)
    .then(cinema => cinema.remove())
    .then(() => res.redirect('/cinemas/'));
}

//creating a comment
function commentsCreateRoute(req, res, next){
  req.body.user = req.currentUser._id;
  req.body.cinema = req.url.replace(/cinemas|\/|comments|'|"/g,'');
  const thisCinema = req.params.id;
  Cinema.findById(req.params.id)
    .then(cinema => {
      cinema.comments.push(req.body);
      return cinema.save();
    })
    .then(() => {
      User.findOne(req.currentUser._id)
        .then(user => {
          console.log(user);
          user.comments.push(req.body);
          console.log(user.comments[user.comments.length-1]);
          return user.save();
        });
    })
    .then(() => {
      Counter.findOne()
        .then(counter => {
          console.log(counter);
          counter.comments++;
          console.log(counter);
          counter.save();
        });
    })
    .then(() => res.redirect(`/cinemas/${thisCinema}`))
    .catch(next);
}

function commentsDeleteRoute(req, res, next){
  Cinema.findById(req.params.id)
    .then(cinema => {
      const comment = cinema.comments.id(req.params.commentId);
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
    })
    .then(cinema => res.redirect(`/cinemas/${cinema._id}`))
    .catch(next);
}

function commentApproveRoute(req, res) {

  Cinema.findById(req.params.id)
    .then(cinema => {
      const comment = cinema.comments.id(req.params.commentId);
      comment.approved = true;
      return cinema.save();
    })
    .then(() => res.redirect(`/cinemas/${req.params.id}`));
}


function profileRoute(req, res) {
  User.findById(req.params.id)
    .populate('comments.cinema')
    .populate('comments.user')
    .then(user => res.render('cinemas/profiles', { user }));
}

module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  commentsCreate: commentsCreateRoute,
  commentsDelete: commentsDeleteRoute,
  commentApprove: commentApproveRoute,
  profile: profileRoute
};
