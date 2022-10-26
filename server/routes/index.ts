import express, { Request, Response, Router } from "express";
import { getWords } from "../controllers/index";

export const serverRouter: Router = express.Router();

serverRouter.get("/words", getWords);

serverRouter.use((req: Request, res: Response) => {
  res.status(404);
  res.send({ error: "Not found" });
});
