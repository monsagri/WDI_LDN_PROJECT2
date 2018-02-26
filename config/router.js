// require 3rd party dependencies
const router = require('express').Router();
const cinemasCon = require('../controllers/cinemas_con');
const registrationsCon = require('../controllers/registrations_con');
const sessionsCon = require('../controllers/sessions_con');


// set up our request handlers
router.get('/', (req, res) => res.render('pages/home'));

router.route('/cinemas')
  .get(cinemasCon.index)
  .post(cinemasCon.create);

router.route('/cinemas/new')
  .get(cinemasCon.new);

router.route('/cinemas/:id')
  .get(cinemasCon.show)
  .put(cinemasCon.update)
  .delete(cinemasCon.delete);

router.route('/cinemas/:id/edit')
  .get(cinemasCon.edit);

router.route('/register')
  .get(registrationsCon.new)
  .post(registrationsCon.create);

router.route('/login')
  .get(sessionsCon.show)
  .post(sessionsCon.login);


module.exports = router;
