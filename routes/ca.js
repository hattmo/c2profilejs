const route = require('express').Router();
const fileUpload = require('express-fileupload');

route.post('/', fileUpload(), (req, res) => {
  if (req.files.myFile) {
    req.files.myFile.mv('cas/CA.jks', (err) => {
      if (err) {
        res.sendStatus('500');
      } else {
        res.sendStatus('200');
      }
    });
  } else {
    res.sendStatus('500');
  }
});

module.exports = route;
