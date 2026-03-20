import server from "./configs/app";

const port = process.env.PORT || 3000;

new server().start(port as number);
