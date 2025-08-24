import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import { connectDb } from "./utils/initDb";
import { logger, morganMiddleware } from "./utils/logger";
import authRoutes from "./routes/authRoutes";
import { authenticateToken } from "./middleware/authMiddleware";
import userMixesRoutes from "./routes/userMixesRoutes";
import newsSummariesRoutes from "./routes/newsSummariesRoutes";
import { specs, swaggerUi } from "./config/swagger";


connectDb();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganMiddleware);

// Swagger API documentation
app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'DailyDrip API Documentation'
}));

// Health check endpoint (no authentication required)
app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Server is running",
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Auth routes (no authentication required)
app.use("/api/auth", authRoutes);

// Protected routes (authentication required)
app.use("/api/user", authenticateToken, userRoutes);
app.use("/api/categories", authenticateToken, categoryRoutes);
app.use("/api/mixes", authenticateToken, userMixesRoutes);
app.use("/api/news-summaries", authenticateToken, newsSummariesRoutes);

app.listen(process.env.PORT, () => {
    logger.info(`Server is running on port ${process.env.PORT}`);
});