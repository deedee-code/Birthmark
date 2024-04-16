import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import serverRoute from "../routes/index";

export default class App {
  private server;

  constructor() {
    this.server = express();
    this.config();
    this.routes();
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

  public start(port: number) {
    this.server.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  }
}
