import express from "express";
import { getAllCategoriesController } from "../controllers/categoryController";

const router = express.Router();

router.get("/getAllCategories", getAllCategoriesController);

export default router;