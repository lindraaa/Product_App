import express from "express";
import 'dotenv/config'
import { connectDB } from "./config/db.js";
import product_route from "./routes/product_route.js"
import path from "path"


const app = express();
const PORT = process.env.PORT || 3000
const __dirname = path.resolve();

app.use(express.urlencoded({ extended: true })); // for postman
app.use(express.json()); // allows us to accept JSON data in the req.body


app.use("/api/products", product_route) // using product_route for product related operations

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}
app.listen(PORT, () => {
    connectDB();
    console.log(`Server Started at http://localhost:${PORT}`)
})

