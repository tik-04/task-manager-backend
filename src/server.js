import express from "express";
import db from "./config/db.js";
import bodyParser from "body-parser";
import cors from 'cors';

const app = express()
const PORT = process.env.PORT



db.connect(err => {
    if (err) console.error('MySQL connection failed:', err);
    else console.log('Connected to MySQL');
});