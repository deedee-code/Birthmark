import express, { Express, Request, Response } from "express";
import myContainer from "./config/inversify.config";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import { pool } from "./config/database";

dotenv.config();
pool.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
  } else {
    console.log("Connected to the Database Successfully...");
  }
});

import TYPES from "./types";

const app: Express = express();

const port = process.env.PORT || 3000;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Server Running Successfully...");
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

export default app;
