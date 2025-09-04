import express from "express";
import { createUser, addUserCategoryPreference, getProfile, getUserHomeScreen, getAllCategoriesFormatted ,getUserPreferredCategoriesStrings} from "../controllers/userController";

const router = express.Router();

/**
 * @swagger
 * /user/createUser:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with name, email, and password
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's full name
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: User successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: MongoDB document ID
 *                   example: "507f1f77bcf86cd799439011"
 *                 userID:
 *                   type: string
 *                   description: Unique user identifier (UUID)
 *                   example: "550e8400-e29b-41d4-a716-446655440000"
 *                 name:
 *                   type: string
 *                   description: User's full name
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   description: User's email address
 *                   example: "john.doe@example.com"
 *                 provider:
 *                   type: string
 *                   description: Authentication provider
 *                   example: "local"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: User creation timestamp
 *                   example: "2024-01-15T10:30:00.000Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: User last update timestamp
 *                   example: "2024-01-15T10:30:00.000Z"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.post("/createUser", createUser);

/**
 * @swagger
 * /user/updateUserCategoryPreference:
 *   post:
 *     summary: Update user category preferences
 *     description: Update or add user's preferred news categories
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               required: [categoryID, categoryName]
 *               properties:
 *                 categoryID:
 *                   type: string
 *                   description: MongoDB ObjectId of the category
 *                   example: "507f1f77bcf86cd799439011"
 *                 categoryName:
 *                   type: string
 *                   description: Name of the category
 *                   example: "Technology"
 *           example:
 *             - categoryID: "507f1f77bcf86cd799439011"
 *               categoryName: "Technology"
 *             - categoryID: "507f1f77bcf86cd799439012"
 *               categoryName: "Sports"
 *     responses:
 *       201:
 *         description: User category preferences successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: MongoDB document ID
 *                   example: "507f1f77bcf86cd799439013"
 *                 userId:
 *                   type: string
 *                   description: User ID
 *                   example: "550e8400-e29b-41d4-a716-446655440000"
 *                 preferredCategories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       categoryID:
 *                         type: string
 *                         description: MongoDB ObjectId of the category
 *                         example: "507f1f77bcf86cd799439011"
 *                       categoryName:
 *                         type: string
 *                         description: Name of the category
 *                         example: "Technology"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Creation timestamp
 *                   example: "2024-01-15T10:30:00.000Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Last update timestamp
 *                   example: "2024-01-15T10:30:00.000Z"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.post("/updateUserCategoryPreference", addUserCategoryPreference);

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get user profile
 *     description: Retrieve user profile information including preferred categories
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User profile successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     userID:
 *                       type: string
 *                       description: Unique user identifier (UUID)
 *                       example: "550e8400-e29b-41d4-a716-446655440000"
 *                     name:
 *                       type: string
 *                       description: User's full name
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       description: User's email address
 *                       example: "john.doe@example.com"
 *                     provider:
 *                       type: string
 *                       description: Authentication provider
 *                       example: "local"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: User creation timestamp
 *                       example: "2024-01-15T10:30:00.000Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: User last update timestamp
 *                       example: "2024-01-15T10:30:00.000Z"
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: Category name
 *                         example: "Technology"
 *                       id:
 *                         type: string
 *                         description: MongoDB ObjectId of the category
 *                         example: "507f1f77bcf86cd799439011"
 *                       imageUrl:
 *                         type: string
 *                         description: Category image URL
 *                         example: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=150&h=150&fit=crop"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get("/profile", getProfile);

/**
 * @swagger
 * /user/home:
 *   get:
 *     summary: Get user home screen data
 *     description: Retrieve user's home screen with main mixes and category preferences
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Home screen data successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 main:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: Unique identifier for the mix
 *                         example: "morning_mix"
 *                       type:
 *                         type: string
 *                         enum: [morning, afternoon, evening, night]
 *                         description: Type of mix
 *                         example: "morning"
 *                       title:
 *                         type: string
 *                         description: Display title
 *                         example: "Morning Mix"
 *                       text:
 *                         type: string
 *                         description: Display description
 *                         example: "Start your day informed"
 *                       image:
 *                         type: string
 *                         description: Image URL for the mix
 *                         example: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=150&h=150&fit=crop"
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: MongoDB ObjectId of the category
 *                         example: "507f1f77bcf86cd799439011"
 *                       type:
 *                         type: string
 *                         description: Category type (lowercase)
 *                         example: "technology"
 *                       title:
 *                         type: string
 *                         description: Display title
 *                         example: "Technology News"
 *                       text:
 *                         type: string
 *                         description: Category name
 *                         example: "Technology"
 *                       image:
 *                         type: string
 *                         description: Category image URL
 *                         example: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=150&h=150&fit=crop"
 *             example:
 *               main:
 *                 - id: "morning_mix"
 *                   type: "morning"
 *                   title: "Morning Mix"
 *                   text: "Start your day informed"
 *                   image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=150&h=150&fit=crop"
 *                 - id: "afternoon_mix"
 *                   type: "afternoon"
 *                   title: "Afternoon Mix"
 *                   text: "Catch up on the day's events"
 *                   image: "https://images.unsplash.com/photo-1553341829-4c9f53513b3b?w=150&h=150&fit=crop"
 *                 - id: "evening_mix"
 *                   type: "evening"
 *                   title: "Evening Mix"
 *                   text: "Wind down with the latest news"
 *                   image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop"
 *                 - id: "night_mix"
 *                   type: "night"
 *                   title: "Night Mix"
 *                   text: "The stories that mattered today"
 *                   image: "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?w=150&h=150&fit=crop"
 *               categories:
 *                 - id: "507f1f77bcf86cd799439011"
 *                   type: "technology"
 *                   title: "Technology News"
 *                   text: "Technology"
 *                   image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=150&h=150&fit=crop"
 *                 - id: "507f1f77bcf86cd799439012"
 *                   type: "sports"
 *                   title: "Sports News"
 *                   text: "Sports"
 *                   image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=150&h=150&fit=crop"
 *       400:
 *         description: Bad request - missing userId
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing userId"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get('/home', getUserHomeScreen);

/**
 * @swagger
 * /user/categories:
 *   get:
 *     summary: Get all categories formatted for home screen
 *     description: Retrieve all available categories formatted for display on the home screen
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: foo
 *         schema:
 *           type: string
 *         description: Optional parameter (TODO: will be replaced with userId)
 *         example: "bar"
 *     responses:
 *       200:
 *         description: Categories successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: MongoDB ObjectId of the category
 *                         example: "507f1f77bcf86cd799439011"
 *                       type:
 *                         type: string
 *                         description: Category type
 *                         example: "category"
 *                       title:
 *                         type: string
 *                         description: Display title with "News" suffix
 *                         example: "Technology News"
 *                       text:
 *                         type: string
 *                         description: Category name
 *                         example: "Technology"
 *                       image:
 *                         type: string
 *                         description: Category image URL or fallback image
 *                         example: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=150&h=150&fit=crop"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get('/categories', getAllCategoriesFormatted);

/**
 * @swagger
 * /user/preferred-categories:
 *   get:
 *     summary: Get user's preferred categories as strings
 *     description: Returns array of user's preferred categories with categoryId and categoryName as strings
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: false
 *         description: User ID (if not provided, taken from auth token)
 *     responses:
 *       200:
 *         description: Preferred categories successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   categoryId:
 *                     type: string
 *                     description: Category ID as string
 *                     example: "507f1f77bcf86cd799439011"
 *                   categoryName:
 *                     type: string
 *                     description: Category name
 *                     example: "Technology"
 *       400:
 *         description: Bad request - missing userId
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing userId"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get('/preferred-categories', getUserPreferredCategoriesStrings);

export default router