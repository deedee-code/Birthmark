import server from "./config/app";

const port = process.env.PORT || 3000;

new server().start(port as number);
