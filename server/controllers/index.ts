import { Request, Response } from "express";
import { readFileSync } from "fs";

interface Word {
  id: number;
  word: string;
  pos: string;
}

interface TestData {
  scoresList: number[];
  wordList: Word[];
}
const rawdata: Buffer = readFileSync("TestData.json");
const testData: TestData = JSON.parse(rawdata.toString());

export const getWords = async (req: Request, res: Response) => {
  res.send("TODO");
};
