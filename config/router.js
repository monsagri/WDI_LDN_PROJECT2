// require 3rd party dependencies
const router = require('express').Router();
const cinemasCon = require('../controllers/cinemas_con');


// set up our request handlers
router.get('/', (req, res) => res.render('pages/home'));

router.route('/cinemas')
  .get(cinemasCon.index)
  .post(cinemasCon.add);

router.route('/cinemas/new')
  .get(cinemasCon.create);

router.route('/cinemas/:id')
  .get(cinemasCon.show)
  .put(cinemasCon.update)
  .delete(cinemasCon.delete);

router.route('/cinemas/:id/edit')
  .get(cinemasCon.edit);




module.exports = router;
