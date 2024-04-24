import express from "express";

import router from "./serverRoute";

const routes = express();

routes.use("/api", router);

export default routes;
