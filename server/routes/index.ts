import express, { Request, Response, Router } from "express";
import { getWords, rank } from "../controllers";

export const serverRouter: Router = express.Router();

serverRouter.get("/words", getWords);
serverRouter.post("/rank", rank);

serverRouter.use((req: Request, res: Response) => {
  res.status(404);
  res.send({ error: "Not found" });
});
