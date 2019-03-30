import * as express from "express";
import { Validator } from "express-json-validator-middleware";
import postProfileScema from "../helpers/schemas/postProfileSchema";
import profilemodel from "../models/profileModel";

const route = express.Router()
const validator = new Validator({ allErrors: true });

route.post("/", validator.validate({ body: postProfileScema }), (req, res, next) => {
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

route.get("/", (req, res) => {
  res.json(profilemodel.getProfiles());
});

route.get("/:id", (req, res) => {
  const profileData = profilemodel.getProfile(req.params.id);
  if (req.query.download) {
    res.append("Content-Disposition", `attachment; filename="${profileData.profile.name}.profile"`);
    res.send(profileData.compiled);
  } else {
    res.json(profileData.profile);
  }
});

route.delete("/:id", async (req, res) => {
  try {
    if (profilemodel.removeProfile(req.params.id)) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (reason) {
    res.sendStatus(500);
  }
});

export default route;
