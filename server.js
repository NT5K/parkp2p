
const express = require('express');
const app = express();

const apiRoutes = require('./routes/apiRoutes');
const accountRoutes = require('./routes/accountRoutes');
const ratesRoutes = require('./routes/ratesRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const carRoutes = require('./routes/carRoutes');
const signin = require('./routes/signin');

const expressValidator = require('express-validator');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');

const port = 5000;
// const port = process.env.PORT || 3001;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.text());
app.use(express.json({ type: 'application/*+json' }));

//routes

app.use(apiRoutes);
app.use(accountRoutes);
app.use(subscriptionRoutes);
app.use(ratesRoutes);
app.use(carRoutes);
app.use(signin);


// use html and api files instead of putting them here
require('./routes/apiRoutes');
require('./routes/accountRoutes');
require('./routes/subscriptionRoutes');
require('./routes/ratesRoutes');
require('./routes/carRoutes');
require('./routes/signin');



app.listen(port, () => `Server running on port ${port}`);