import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import serverRoute from "../routes/index";
import { pool } from "./database";

dotenv.config();

export default class App {
  private server;

  constructor() {
    this.server = express();
    this.config();
    this.routes();
    this.database();
  }

  public config() {
    this.server.use(bodyParser.json());
    this.server.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
    this.server.use(morgan("dev"));
    this.server.use(cors());
  }

  public routes() {
    this.server.use("/", serverRoute);
  }

  public database() {
    pool.connect((err) => {
      if (err) {
        console.error("Error connecting to the database:", err.stack);
      } else {
        console.log("Connected to the Database Successfully...");
      }
    });
  }

  public start(port: number) {
    this.server.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  }
}
