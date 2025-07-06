import express from "express";
import { createUser, addUserCategoryPreference, getProfile } from "../controllers/userController";

const router = express.Router();

router.post("/createUser", createUser);
router.post("/addUserCategoryPreference", addUserCategoryPreference);
router.get("/profile", getProfile);

export default router