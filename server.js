import config from "./src/config/config.js";
import express from "express";
import connectDB from "./src/db/db.js";
import authRoutes from "./src/routes/authRoutes.js";

const app = express();
const PORT = config.PORT || 3000;

app.use(express.json());
// app.use((req, res, next) => {
//   console.log("Request received:", req.method, req.url);
//   next();
// });

// app.get("/", (req, res) => {
//   res.status(200).json({
//     message: "Server is running successfully",
//   });
// });

app.use("/api/auth", authRoutes);

const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    server.on("error", (error) => {
      console.error("Server startup failed:", error.message);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exitCode = 1;
  }
};

startServer();
