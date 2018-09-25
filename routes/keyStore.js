const route = require('express').Router();
const fs = require('fs');
const keygen = require('../models/keyStoreModel');

route.post('/', (req, res) => {
  const reqData = req.body;
  keygen.generateKeyStore({
    cn: reqData.cn,
    ou: reqData.ou,
    o: reqData.o,
    password: reqData.password,
  }).then(() => {
    res.sendStatus('200');
  }).catch((err) => {
    console.error(err);
    res.sendStatus('500');
  });
});

route.get('/', (req, res) => {
  const out = {
    value: [],
  };
  fs.readdir('keystores/', (err, files) => {
    if (err) {
      res.sendStatus('500');
    }
    files.forEach((file) => {
      out.value.push(file);
    });
    res.json(out);
  });
});

module.exports = route;
