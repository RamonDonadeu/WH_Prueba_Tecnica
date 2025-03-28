import express from "express";
import "reflect-metadata";
import { DatabaseConnection } from "./typeORM/data-source.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const port = 8080;

app.use(express.json());

app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const startServer = async () => {
  try {
    await DatabaseConnection.initialize();
    console.log("Database connection initialized");

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error during application startup:", error);
  }
};

startServer();