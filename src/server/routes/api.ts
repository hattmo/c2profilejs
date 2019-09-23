import { Router } from "express";
import profiles from "./profiles";
import keystores from "./keystores";
import ProfileModel from "../models/profileModel";
import KeystoreModel from "../models/keyStoreModel";

export default (profileModel: ProfileModel, keystoreModel: KeystoreModel) => {
    const router = Router();
    router.use("/profiles", profiles(profileModel));
    router.use("/keystores", keystores(keystoreModel));
    return router;
};
