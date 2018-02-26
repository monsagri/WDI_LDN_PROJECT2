// get the cinema model
const Cinema = require('../models/cinema');

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
module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute
};
