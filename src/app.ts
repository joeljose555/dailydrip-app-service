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


connectDb();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganMiddleware);

// Auth routes (no authentication required)
app.use("/api/auth", authRoutes);

// Protected routes (authentication required)
app.use("/api/user", authenticateToken, userRoutes);
app.use("/api/categories", authenticateToken, categoryRoutes);

app.listen(process.env.PORT, () => {
    logger.info(`Server is running on port ${process.env.PORT}`);
});