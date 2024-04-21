import server from "./config/app";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;

new server().start(port as number);
