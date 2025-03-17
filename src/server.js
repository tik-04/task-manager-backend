import express from "express";
import db from "./config/db.js";
import bodyParser from "body-parser";
import cors from 'cors';
import authRoute from "./routes/authRoutes.js";
import taskRoute from "./routes/taskRoutes.js";
import userRoute from "./routes/userRoutes.js";
import cookieParser from "cookie-parser"

const app = express()
const PORT = process.env.PORT

const allowedOrigins = ["http://localhost:5173"];

app.use(express.static('public'));
app.use(cors({
    origin: allowedOrigins,
    credentials: true 
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("Server is Working");
});


//route
app.use("/auth", authRoute);
app.use("/tasks", taskRoute);
app.use("/user", userRoute)

db.connect(err => {
    if (err) console.error('MySQL connection failed:', err);
    else console.log('Connected to MySQL');
});


app.listen(PORT, () => {
    console.log("Server is running on localhost:3000");
});