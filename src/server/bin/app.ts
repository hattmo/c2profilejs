import express from "express";
import { ValidationError } from "express-json-validator-middleware";
import logger from "morgan";
import path from "path";
import KeystoreModel from "../models/keyStoreModel";
import ProfileModel from "../models/profileModel";
import api from "../routes/api";
import htmlpage from "../routes/htmlpage";

const keystoreModel = new KeystoreModel();
const profileModel = new ProfileModel();

const app = express();
app.use(logger(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use("/api/", express.json(), api(profileModel, keystoreModel));
app.use("/static/", express.static(path.join(__dirname, "../../client")));
// app.use((_req, res) => {
//   res.sendFile(path.join(__dirname, "../../client/index.html"));
// });
app.use(htmlpage);

app.use((err, _req, res, _next) => {
  if (err instanceof ValidationError) {
    //  process.stderr.write(`${err.validationErrors}\n`);
    const errorObject = err.validationErrors.body[0];
    res.status(400).json({
      errorMessage: errorObject.dataPath + " " + errorObject.message,
    });
  } else {
    res.sendStatus(500);
    process.stderr.write(`${err}\n`);
  }
});

export default app;
