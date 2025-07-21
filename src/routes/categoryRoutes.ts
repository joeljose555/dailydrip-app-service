import express from "express";
import { getAllCategoriesController } from "../controllers/categoryController";
import { getAllCategoriesFormatted } from '../controllers/userController';

const router = express.Router();

router.get("/getAllCategories", getAllCategoriesController);
router.get('/allFormatted', getAllCategoriesFormatted);

export default router;