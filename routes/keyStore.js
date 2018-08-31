var route = require('express').Router()
var keygen = require('../models/keyStoreModel')

route.post('/', (req, res, next) => {
    var reqData = req.body
    console.log(req.body)
    keygen.generateKeyStore({
        cn: reqData.cn,
        ou: reqData.ou,
        o: reqData.o,
        password: reqData.password
    }, (err) => {
        if (!err) {
            res.status('200')
        } else {
            res.status('500')
        }
    })
})

rout

module.exports = route