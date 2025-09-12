import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";




dotenv.config();
const app = express();

app.use(express.json());

const MONGO_URL = "mongodb://127.0.0.1:27017/ecommerce";

mongoose.connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("DB connection error:", err));

mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});


app.get("/", (req, res) => {
  res.send("App is running");
});

app.use("/api/auth", authRoutes);

app.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`You passed ID: ${id}`);
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
