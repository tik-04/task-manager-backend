import express from "express";
import db from "./config/db.js";
import bodyParser from "body-parser";
import cors from 'cors';

const app = express()
const PORT = process.env.PORT

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is Working");
});


//route
app.use('/user/:id', roomRoute)

db.connect(err => {
    if (err) console.error('MySQL connection failed:', err);
    else console.log('Connected to MySQL');
});


app.listen(PORT, () => {
    console.log("Server is running on localhost:3000");
});