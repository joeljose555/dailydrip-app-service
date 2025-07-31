import express from "express";
import { getNewsSummaryByIdController, getAllNewsSummariesController } from "../controllers/newsSummariesController";

const router = express.Router();

// Get news summary by ID
router.get("/:id", getNewsSummaryByIdController);

// Get all news summaries
router.get("/", getAllNewsSummariesController);

export default router; 