var route = require('express').Router()
const fileUpload = require('express-fileupload');
const fs = require('fs')

route.post('/', fileUpload(), (req, res, next) => {
    console.log(req.files)
    if (req.files.myFile) {
        req.files.myFile.mv('cas/CA.jks', (err) => {
            if (err) {
                res.sendStatus('500')
            }else{
                res.sendStatus('200')
            }
        })
    }else{
        res.sendStatus('500')
    }
})

module.exports = route