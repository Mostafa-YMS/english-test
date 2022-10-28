import { Request, Response } from "express";
import testData, { Word } from "./testData";

//initialize a list for each word category
const adverbList: Word[] = [],
  verbList: Word[] = [],
  nounList: Word[] = [],
  adjectiveList: Word[] = [];

//fill each word category list with words
testData.wordList.forEach((e: Word) => {
  e.pos === "adverb" && adverbList.push(e);
  e.pos === "verb" && verbList.push(e);
  e.pos === "noun" && nounList.push(e);
  e.pos === "adjective" && adjectiveList.push(e);
});

const getRandomNumber = (max: number): number => {
  return Math.floor(Math.random() * max);
};

// get a random word from a word category list and remove it
const getRandomWord = (list: Word[]) => {
  const randomNumber = getRandomNumber(list.length);
  const word = list[randomNumber];
  list.splice(randomNumber, 1);
  return word;
};

// fill the remaining of the random list needed
const fillTheList = (randomList: Word[], tempWordsList: Array<Word[]>) => {
  // get random category index
  const randomNumber = getRandomNumber(tempWordsList.length);

  // push random word to the list
  randomList.push(getRandomWord(tempWordsList[randomNumber]));

  // remove the category if it is empty
  tempWordsList[randomNumber].length < 1 &&
    tempWordsList.splice(randomNumber, 1);

  // recursion until the list is full
  randomList.length < 10 && fillTheList(randomList, tempWordsList);
};

export const getWords = async (req: Request, res: Response) => {
  try {
    // make temporary copy of word category lists
    const tempWordsList: Array<Word[]> = [
      [...adverbList],
      [...verbList],
      [...nounList],
      [...adjectiveList],
    ];

    // initialize the list with a randomword from each category
    const randomList: Word[] = [
      getRandomWord(tempWordsList[0]),
      getRandomWord(tempWordsList[1]),
      getRandomWord(tempWordsList[2]),
      getRandomWord(tempWordsList[3]),
    ];

    fillTheList(randomList, tempWordsList);

    // sort the list randomly
    randomList.sort(() => Math.random() - 0.5);
    
    res.status(200);
    res.send(randomList);
  } catch (error) {
    res.status(500);
    res.send({ status: "failed", message: "something went wrong" });
  }
};
