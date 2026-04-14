import express from "express";

import serverRouter from "./serverRoute";
import authRouter from "./auth.route";
import celebrantRouter from "./contact.route";

const routes = express.Router();

routes.use("/api/v1", serverRouter);
routes.use("/api/v1", authRouter);
routes.use("/api/v1/celebrants", celebrantRouter);

export default routes;
