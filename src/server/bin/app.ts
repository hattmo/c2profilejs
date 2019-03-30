/* eslint no-unused-vars: 0 */
import * as express from "express";
import { ValidationError } from "express-json-validator-middleware";
import * as logger from "morgan";
import * as path from "path";
import keystores from "../routes/keystores";
import profiles from "../routes/profiles";
console.log(__dirname)
const app = express();
app.use(logger(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.static(path.join(__dirname, "../../client")));
app.use(express.json());
app.use("/keystores", keystores);
app.use("/profiles", profiles);

app.use((_req, _res, next) => {
  next(404);
});

app.use((err, _req, res, _next) => {
  if (err instanceof ValidationError) {
    console.error("invalid json");
    console.log(err.validationErrors);
    res.sendStatus(400);
  } else if (err === 404) {
    res.sendStatus(404);
  } else {
    res.sendStatus(500);
    console.log(err);
  }
});

export default app;
