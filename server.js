
const express = require('express');
const app = express();
const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use(express.json({ type: 'application/*+json' }));
//routes

app.use(htmlRoutes);
app.use(apiRoutes);


// use html and api files instead of putting them here
require('./routes/htmlRoutes');
require('./routes/apiRoutes');

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);