import { Request, Response } from "express";
import testData from "./testData";

export const rank = async (req: Request, res: Response) => {
  try {
    const scoresList: number[] = testData.scoresList;
    const score: number = parseFloat(req.body.score);

    // validate score
    if (score < 0 || score > 100 || isNaN(score)) {
      res.status(400);
      return res.send({
        status: "failed",
        message: "score must be a valid number",
      });
    }

    // calculate rank
    const scoresBelow: number[] = scoresList.filter((e) => e < score);
    const rank: string = (
      (scoresBelow.length / scoresList.length) *
      100
    ).toFixed(2);

    res.status(200);
    res.send(rank);
  } catch (error) {
    res.status(500);
    res.send({ status: "failed", message: "something went wrong" });
  }
};
