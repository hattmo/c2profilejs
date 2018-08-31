var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var getKeyStore = require('./routes/keyStore')

var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/get',getKeyStore)

app.use(express.static(path.join(__dirname, 'public')))



module.exports = app;
