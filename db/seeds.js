// set third party apps
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// require Models
const Cinema = require('../models/cinema');

// require Data
const cinemaData = require('./data/cinemas');

// connect to database
mongoose.connect('mongodb://localhost/cinema-database', (err, db) => {
  // clear database
  db.dropDatabase();

  // seed database with data
  Cinema.create(cinemaData)
    // log number of records created once done
    .then((cinemas) => console.log(`${cinemas.length} records created`))
    // log any errors
    .catch(err => console.log(err))
    // close connection to database
    .finally(() => mongoose.connection.close());
});
