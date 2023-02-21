import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import notesRouter from "./routes/notes";
import authRouter from "./routes/auth";
const port = process.env.PORT;
const DB_URL = process.env.DB_URL;

// CONFIGURATIONS
const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// {
//     origin: "http://localhost:3000",
//     credentials: true, //access-control-allow-credentials:true
//     optionSuccessStatus: 200,
//   }

// Routes
app.use("/api/notes", notesRouter);
app.use("/api/auth", authRouter);

// connect to database
mongoose.set("strictQuery", false);
mongoose
  .connect(DB_URL!)
  .then(() => {
    console.log("DB_CONNECTED");
  })
  .catch(error => {
    console.error(error);
  });

// Server setup
app.listen(port, () => {
  console.log(`app is renning on http://localhost:${port}/`);
});
