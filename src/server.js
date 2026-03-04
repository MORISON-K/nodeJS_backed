import express from "express"
import movieRoutes from "./routes/movieRoutes.js"

const app = express()

/// API ROUTES
app.use("/movies", movieRoutes);

const PORT = 5001;
const server = app.listen(
    PORT, () => {
        console.log(`server running on port ${PORT}`)
    }
)

// http://localhost:5001