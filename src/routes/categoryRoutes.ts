import express from "express";
import { getAllCategoriesController } from "../controllers/categoryController";

const router = express.Router();

/**
 * @swagger
 * /categories/getAllCategories:
 *   get:
 *     summary: Get all active categories
 *     description: Retrieve all active news categories with their basic information
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Categories successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryArray'
 *             examples:
 *               TechnologyCategory:
 *                 summary: Technology category example
 *                 value:
 *                   - id: "507f1f77bcf86cd799439011"
 *                     name: "Technology"
 *                     imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=150&h=150&fit=crop"
 *                   - id: "507f1f77bcf86cd799439012"
 *                     name: "Sports"
 *                     imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop"
 *                   - id: "507f1f77bcf86cd799439013"
 *                     name: "Politics"
 *                     imageUrl: null
 *                   - id: "507f1f77bcf86cd799439014"
 *                     name: "Entertainment"
 *                     imageUrl: "https://images.unsplash.com/photo-1489599835382-acb29302e9be?w=150&h=150&fit=crop"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/getAllCategories", getAllCategoriesController);

export default router;