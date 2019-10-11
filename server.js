
const express = require('express');
const app = express();

const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');
const signin = require('./routes/signin');

const expressValidator = require('express-validator');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

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
app.use(htmlRoutes);
app.use(apiRoutes);
app.use(signin);


// use html and api files instead of putting them here
require('./routes/htmlRoutes');
require('./routes/apiRoutes');
require('./routes/signin');

const port = process.env.PORT||5000;

app.listen(port, () => `Server running on port ${port}`);