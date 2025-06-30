import express from "express";
import { createUser, addUserCategoryPreference } from "../controllers/userController";

const router = express.Router();

router.post("/createUser", createUser);
router.post("/addUserCategoryPreference", addUserCategoryPreference);

export default router