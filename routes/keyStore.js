var route = require('express').Router()
var keygen = require('../models/keyStoreModel')
var fs = require('fs')

route.post('/', (req, res, next) => {
    console.log(req.body)
    var reqData = req.body
    keygen.generateKeyStore({
        cn: reqData.cn,
        ou: reqData.ou,
        o: reqData.o,
        password: reqData.password
    }).then(() => {
        res.sendStatus('200')
    }).catch((err) => {
        console.error(err)
        res.sendStatus('500')
    })
})

route.get('/', (req, res, next) => {
    var out = {
        value: []
    }
    fs.readdir('keystores/', (err, files) => {
        if (err) {
            res.sendStatus('500')
        }
        files.forEach(file => {
            out.value.push(file)
        });
        res.json(out)
    })
})

module.exports = route