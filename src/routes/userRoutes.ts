import express from "express";
import { createUser, addUserCategoryPreference, getProfile, getUserHomeScreen } from "../controllers/userController";

const router = express.Router();

router.post("/createUser", createUser);
router.post("/addUserCategoryPreference", addUserCategoryPreference);
router.get("/profile", getProfile);
router.get('/home', getUserHomeScreen);

export default router