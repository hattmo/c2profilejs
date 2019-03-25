const route = require('express').Router();
const { Validator } = require('express-json-validator-middleware');
const postProfileScema = require('../helpers/schemas/postProfileSchema');
const profilemodel = require('../models/profileModel');

const validator = new Validator({ allErrors: true });

route.post('/', validator.validate({ body: postProfileScema }), (req, res, next) => {
  try {
    if (profilemodel.addProfile(req.body)) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  } catch (reason) {
    next(reason);
  }
});

route.get('/', (req, res) => {
  res.json(profilemodel.getProfiles());
});

route.get('/:id', (req, res) => {
  const profileData = profilemodel.getProfile(req.params.id);
  if (req.query.download) {
    res.append('Content-Disposition', `attachment; filename="${profileData.profile.name}.profile"`);
    res.send(profileData.compiled);
  } else {
    res.json(profileData.profile);
  }
});

route.delete('/:id', async (req, res) => {
  try {
    if (profilemodel.removeKeystore(req.params.id)) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (reason) {
    res.sendStatus(500);
  }
});

module.exports = route;
