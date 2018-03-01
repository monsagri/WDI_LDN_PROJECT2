// set third party apps
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// require Models
const Cinema = require('../models/cinema');
const User =require('../models/user');
const Counter =require('../models/counter');

// require Data
const cinemaData = require('./data/cinemas');
const userData = require('./data/users');
const counterData = require('./data/counters');

// connect to database
mongoose.connect('mongodb://localhost/cinema-database', (err, db) => {
  // clear database
  db.dropDatabase();

  // seed Cinema collection with data
  Cinema.create(cinemaData)
    // log number of records created once done
    .then((cinemas) => console.log(`${cinemas.length} records created`))
    // log any errors
    .catch(err => console.log(err))

    // seed User collection
    .then(User.create(userData))
    // seed Counter
    .then(Counter.create(counterData))
    // log any errors
    .catch(err => console.log(err))

    // close connection to database
    .finally(() => mongoose.connection.close());

});
