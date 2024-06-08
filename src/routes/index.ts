import express from "express";

import router from "./serverRoute";
import authRouter from "./apiAuth.route";

const routes = express();

routes.use("/api/v1", router);
routes.use("/api/v1", authRouter);

export default routes;
