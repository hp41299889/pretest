import express from "express";
import { exchangeRouter } from "./api/exchange/router";

const server = express();

server.use("/api", exchangeRouter);

server.listen(3000, () => {
  console.log("server is running on port 3000");
});
