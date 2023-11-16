import { Router } from "express";
import { getExchange } from "./service";

export const exchangeRouter = Router();

exchangeRouter.route("/exchange").get(getExchange);
