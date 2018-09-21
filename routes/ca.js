var route = require('express').Router()
const fs = require('fs')

route.post('/', (req, res, next) => {

    req.pipe(fs.createWriteStream('cas/test.jpg')).on('finish', () => {
        res.sendStatus('200')
    })
})

module.exports = route