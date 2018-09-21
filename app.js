var express = require('express')
var path = require('path')
//var cookieParser = require('cookie-parser')
var logger = require('morgan')
var keyStore = require('./routes/keyStore')
var ca = require('./routes/ca')


var app = express()


app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json())
//app.use(express.urlencoded({ extended: false }))
//app.use(cookieParser())

app.use('/keystores', keyStore)
app.use('/cas', ca)





module.exports = app;
