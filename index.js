// Require 3rd Party Depenencies
// require express to manage website
const express = require('express');
// Use ejs-layout plugin for express to build websites
const expressLayouts = require('express-ejs-layouts');
// require mongoose to work on database
const mongoose = require('mongoose');
// set mongoose to use bluebird for promises
mongoose.Promise = require('bluebird');
// require body-parser to deal with creating new stuff
const bodyParser = require('body-parser');
// Add method-override to allow posting and editing
const methodOverride = require('method-override');

// require homemade dependencies
const router = require('./config/router');


// Set app to use express
const app = express();
// configure express and ejs expressLayouts
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

// Use Body Parser to understand form input
app.use(bodyParser.urlencoded({extended: true}));
// Use Method override
app.use(methodOverride(req => {
  // check whether we have a req.body and if there is an object method in there. Extract it to know what to do with the body and remove it
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

// connect to the database

mongoose.connect('mongodb://localhost/cinema-database');

// use my Router
app.use(router);

// Configure the port

const PORT = 8000;

// Set app listen on port and console log something

app.listen(PORT, () => console.log('locked and loaded on port 8000'));
