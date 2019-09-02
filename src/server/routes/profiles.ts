import * as express from "express";
import { Validator } from "express-json-validator-middleware";
import postProfileScema from "../helpers/schemas/postProfileSchema";
import ProfileModel from "../models/profileModel";
import { isUndefined } from "util";

export default (profileModel: ProfileModel) => {
  const route = express.Router()
  const validator = new Validator({ allErrors: true });

  route.post("/", validator.validate({ body: postProfileScema }), (req, res, next) => {
    try {
      if (profileModel.addProfile(req.body)) {
        res.sendStatus(200);
      } else {
        res.sendStatus(400);
      }
    } catch (reason) {
      next(reason);
    }
  });

  route.get("/", (_req, res) => {
    res.json(profileModel.getProfiles());
  });

  route.get("/:id", (req, res, next) => {
    const profileData = profileModel.getProfile(req.params.id);
    if (!isUndefined(profileData)) {
      if (req.query.download) {
        res.append("Content-Disposition", `attachment; filename="${profileData.profile.name}.profile"`);
        res.send(profileData.compiled);
      } else {
        res.json(profileData.profile);
      }
    } else {
      next(404);
    }
  });

  route.delete("/:id", async (req, res) => {
    try {
      if (profileModel.removeProfile(req.params.id)) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    } catch (reason) {
      res.sendStatus(500);
    }
  });

  return route;
}