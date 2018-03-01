// require my dependencies
const router = require('express').Router();
const cinemasCon = require('../controllers/cinemas_con');
const registrationsCon = require('../controllers/registrations_con');
const sessionsCon = require('../controllers/sessions_con');
// load secureRoute
const secureRoute = require('../lib/secureRoute');
const adminRoute = require('../lib/adminRoute');


// set up our request handlers
router.get('/', (req, res) => res.render('pages/home'));

router.all('/422', (req, res) => res.render('pages/422'));

router.route('/cinemas')
  .get(cinemasCon.index)
  .post(secureRoute, cinemasCon.create);

router.route('/cinemas/new')
  .get(secureRoute, cinemasCon.new);

router.route('/cinemas/:id')
  .get(cinemasCon.show)
  .put(secureRoute, cinemasCon.update)
  .delete(secureRoute, cinemasCon.delete);

router.route('/profiles/:id')
  .get(secureRoute, cinemasCon.profile);

router.route('/cinemas/:id/edit')
  .get(secureRoute, cinemasCon.edit);

router.route('/cinemas/:id/favorite')
  .put(secureRoute, sessionsCon.favorite)
  .delete(secureRoute, sessionsCon.unFavorite);


router.route('/cinemas/:id/comments')
  .post(secureRoute, cinemasCon.commentsCreate);

router.route('/cinemas/:id/comments/:commentId')
  .delete(secureRoute, cinemasCon.commentsDelete)
  .put(adminRoute, cinemasCon.commentApprove);

router.route('/register')
  .get(registrationsCon.new)
  .post(registrationsCon.create);

router.route('/login')
  .get(sessionsCon.show)
  .post(sessionsCon.login);

router.route('/myprofile')
  .get(secureRoute, sessionsCon.myProfile);

router.route('/moderation')
  .get(adminRoute, sessionsCon.moderation);

router.route('/moderation/:id/comments/:id')
  .put(adminRoute, sessionsCon.moderatorApprove)
  .delete(adminRoute, sessionsCon.moderatorDelete);

router.route('/logout')
  .get(sessionsCon.logout);

router.all('/*', (req, res) => res.render('pages/404'));

module.exports = router;
