import express, { Express, Request, Response } from "express";
import myContainer from "./config/inversify.config";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";

dotenv.config();

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

app.get("/", (req: Request, res: Response) => {
  res.send("Server Running Successfully...");
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
