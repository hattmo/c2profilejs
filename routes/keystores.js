const route = require('express').Router();
const { Validator, ValidationError } = require('express-json-validator-middleware');
const keygen = require('../models/keyStoreModel');
const keymanager = require('../models/keyStoreManager');
const postKeystoresScema = require('../helpers/schemas/postKeystoresSchema');

const validator = new Validator({ allErrors: true });

route.post('/', validator.validate({ body: postKeystoresScema }), (req, res) => {
  let ca;
  if (req.body.ca) {
    ca = keymanager.getKeystore(req.body.ca);
    if (!ca) {
      res.sendStatus('500');
      return;
    }
  }
  keygen.generateKeyStore(req.body.keystore, req.body.opt, ca).then(() => {
    keymanager.addKeystore(req.body.keystore);
    res.sendStatus('200');
  }).catch((err) => {
    console.error(err);
    res.sendStatus('500');
  });
});

route.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    console.error('invalid json');
    res.sendStatus('400');
  } else {
    next(err);
  }
});

route.get('/', (req, res) => {
  const output = {
    keystores: keymanager.stores,
  };
  res.json(output);
});

module.exports = route;
