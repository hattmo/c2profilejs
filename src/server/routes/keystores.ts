import Express from "express";
import Path from "path";
import { Validator } from "express-json-validator-middleware";
import postKeystoresScema from "../helpers/schemas/postKeystoresSchema";
import KeystoreModel from "../models/keyStoreModel";

export default (keystoreModel: KeystoreModel) => {

  const route = Express.Router();
  const validator = new Validator({ allErrors: true });

  route.post("/", validator.validate({ body: postKeystoresScema }), async (req, res) => {
    try {
      if (await keystoreModel.addKeystore(req.body.keystore, req.body.opt, req.body.ca)) {
        res.sendStatus(200);
      } else {
        res.sendStatus(400);
      }
    } catch (err) {
      res.sendStatus(500);
    }
  });

  route.get("/", (_req, res) => {
    res.json(keystoreModel.getKeystores());
  });

  route.get("/:id", (req, res) => {
    if (req.query.download) {
      try {
        res.download(Path.join(__dirname, `../../../keystores/${req.params.id}.jks`), `${req.params.id}.jks`);
      } catch (err) {
        res.sendStatus(500);
      }
    } else {
      const keystore = keystoreModel.getKeystore(req.params.id);
      if (keystore) {
        res.json(keystore);
      } else {
        res.sendStatus(404);
      }
    }
  });

  route.delete("/:id", async (req, res) => {
    try {
      if (await keystoreModel.removeKeystore(req.params.id)) {
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
