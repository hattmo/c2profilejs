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
    }, (err, contents) => {
        console.log(err)
        console.log('done')
        if (!err) {
            console.log('responded')
            res.sendStatus('200')
        } else {
            res.sendStatus('500')
        }
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