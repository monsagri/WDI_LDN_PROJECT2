const Cinema = require('../models/cinema');

// rendering the cinema index
function indexRoute(req, res) {
  Cinema.find()
    .then(cinemas => res.render('cinemas/index', { cinemas } ));
}

function createRoute(req, res, next) {

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


module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute
};
