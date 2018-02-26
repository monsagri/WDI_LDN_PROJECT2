// require my dependencies
const router = require('express').Router();
const cinemasCon = require('../controllers/cinemas_con');
const registrationsCon = require('../controllers/registrations_con');
const sessionsCon = require('../controllers/sessions_con');
// load secureRoute
const secureRoute = require('../lib/secureRoute');


// set up our request handlers
router.get('/', (req, res) => res.render('pages/home'));

router.route('/cinemas')
  .get(cinemasCon.index)
  .post(secureRoute, cinemasCon.create);

router.route('/cinemas/new')
  .get(secureRoute, cinemasCon.new);

router.route('/cinemas/:id')
  .get(cinemasCon.show)
  .put(secureRoute, cinemasCon.update)
  .delete(secureRoute, cinemasCon.delete);

router.route('/cinemas/:id/edit')
  .get(secureRoute, cinemasCon.edit);

router.route('/cinemas/:id/comments')
  .post(secureRoute, cinemasCon.commentsCreate);

router.route('/cinemas/:id/comments/:commentId')
  .delete(secureRoute, cinemasCon.commentsDelete);

router.route('/register')
  .get(registrationsCon.new)
  .post(registrationsCon.create);

router.route('/login')
  .get(sessionsCon.show)
  .post(sessionsCon.login);

router.route('/logout')
  .get(sessionsCon.logout);


module.exports = router;
