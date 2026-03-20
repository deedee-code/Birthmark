import express from "express";

import router from "./serverRoute";
import authRouter from "./apiAuth.route";
import celebrantRouter from "./celebrant.route";

const routes = express();

routes.use("/api/v1", router);
routes.use("/api/v1", authRouter);
routes.use("/api/v1/celebrants", celebrantRouter);

export default routes;
