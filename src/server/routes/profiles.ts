import express from "express";
import { Validator } from "express-json-validator-middleware";
import postProfileScema from "../helpers/schemas/postProfileSchema";
import ProfileModel from "../models/profileModel";

export default (profileModel: ProfileModel) => {
  const route = express.Router();
  const validator = new Validator({ allErrors: true });

  route.post("/", validator.validate({ body: postProfileScema }), (req, res, next) => {
    try {
      if (profileModel.addProfile(req.body)) {
        res.sendStatus(200);
      } else {
        res.status(400).json({
          errorMessage: "A profile by that name already exists.",
        });
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
    if (profileData !== undefined) {
      if (req.query.download !== undefined) {
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
};
