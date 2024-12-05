

import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDb } from "./utils/dbCnnection.js";
import userRouter from "./routes/userRoute.js";
import blogRouter from "./routes/blogRouter.js";
import cookieParser from "cookie-parser";
dotenv.config();

const PORT = process.env.PORT || 8080;


const app = express();

// Middleware
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// CORS Configuration
const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true
};
app.use(cors(corsOptions));

// Test Route
app.get("/", (req, res) => {
    res.send("Hello from Backend");
});

// API Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);

// Start Server
app.listen(PORT, () => {
    connectDb();
    console.log(`Server started on port ${PORT}`);
});





