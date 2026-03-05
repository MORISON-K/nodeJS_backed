import express from "express"
import movieRoutes from "./routes/movieRoutes.js"
import authRoutes  from "./routes/authRoutes.js"
import { config } from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";

config();
connectDB();

const app = express()

//Body parsing middle ware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// API ROUTES
app.use("movies", movieRoutes);
app.use("/auth", authRoutes);


const PORT = 5001;
const server = app.listen(
    PORT, () => {
        console.log(`server running on port ${PORT}`)
    }
)

//Handle unhandled promise rejections eg database connection errors
process.on("unhandledRejection", (err) => {
    console.log("Unhandled Rejection:", err);
    server.close(async () => {
        await disconnectDB();
        process.exit(1);
    })
})

//Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
    console.log("Uncaught Exception:", err);
    server.close(async () => {
        await disconnectDB();
        process.exit(1);
    })
})

// Gracefull shutdomn
process.on("SIGTERM", async () => {
    console.log("SIGSTERM received, shutting down gracefully");
    server.close(async () => {
        await disconnectDB();
        process.exit(0);
    })
})