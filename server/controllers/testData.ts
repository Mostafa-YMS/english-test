import { readFileSync } from "fs";

export interface Word {
  id: number;
  word: string;
  pos: string;
}

interface TestData {
  scoresList: number[];
  wordList: Word[];
}

//get the data from json file
const rawdata: Buffer = readFileSync("TestData.json");
const testData: TestData = JSON.parse(rawdata.toString());
export default testData;
