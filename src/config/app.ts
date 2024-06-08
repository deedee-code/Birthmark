import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import passport from "passport";
import cors from "cors";
import session from "express-session";
import serverRoute from "../routes/index";
import { pool } from "./database";

dotenv.config();

// const secret: string | undefined = process.env.SESSION_SECRET;

export default class App {
  private server: Application;
  private readonly secret?: string = process.env.SESSION_SECRET;

  constructor() {
    this.server = express();
    this.config();
    this.routes();
    this.connect_to_db();
  }

  public config() {
    if (!this.secret) {
      throw new Error("SESSION_SECRET not found in .env file.");
    }

    this.server.use(bodyParser.json());
    this.server.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
    this.server.use(morgan("dev"));
    this.server.use(cors());
    this.server.use(
      session({
        secret: this.secret,
        resave: false,
        saveUninitialized: false,
      })
    );
    this.server.use(passport.initialize());
    this.server.use(passport.session());
  }

  public routes() {
    this.server.use("/", serverRoute);
  }

  public connect_to_db() {
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
