import express, { Application } from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler";
import projectRoutes from "./routes/projectRoutes";
import cors from "cors";

dotenv.config();

const app: Application = express();
app.use(express.json());
app.use(cors());

// Use the project routes
app.use(projectRoutes);

app.use(errorHandler as any); // Pass the error handler directly

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
