/* eslint no-unused-vars: 0 */
const express = require('express');
const path = require('path');
const logger = require('morgan');
const { ValidationError } = require('express-json-validator-middleware');
const keystores = require('../routes/keystores');
const profiles = require('../routes/profiles');

const app = express();
app.use(logger(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.json());
app.use('/keystores', keystores);
app.use('/profiles', profiles);

app.use((req, res, next) => {
  next(404);
});

app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    console.error('invalid json');
    res.sendStatus(400);
  } else if (err === 404) {
    console.log('no match');
    res.sendStatus(404);
  } else {
    console.log('error');
    res.sendStatus(500);
  }
});

module.exports = app;
