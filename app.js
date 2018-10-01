const express = require('express');
const path = require('path');
// var cookieParser = require('cookie-parser')
const logger = require('morgan');
const keystores = require('./routes/keystores');
const ca = require('./routes/ca');


const app = express();


app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
// app.use(express.urlencoded({ extended: false }))
// app.use(cookieParser())

app.use('/keystores', keystores);
app.use('/cas', ca);


module.exports = app;
