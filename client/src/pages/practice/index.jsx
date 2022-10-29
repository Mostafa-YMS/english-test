import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getWordsService } from "../../services";
import "../../styles/practice.css";

const wordPos = ["verb", "adverb", "noun", "adjective"];

const Practice = () => {
  const [words, setWords] = useState();
  const [score, setScore] = useState(0);
  const [rightAnswer, setRightAnswer] = useState();
  const [loading, setLoading] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);

  const getWords = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getWordsService();
      setWords(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getWords && getWords();
  }, [getWords]);

  const answerQuestion = ({ target }) => {
    if (target?.name === words[currentWord]?.pos) {
      setRightAnswer(true);
      setScore((prev) => prev + 1);
      target?.classList.add("btn-right");
    } else {
      setRightAnswer(false);
      target?.classList.add("btn-wrong");
    }
  };

  return (
    <>
      {words && !loading && (
        <div className="paper">
          <h2>Practice</h2>

          <p className="word">{words[currentWord]?.word}</p>

          <p
            className="txt-right"
            style={{
              visibility: rightAnswer === true ? "visible" : "hidden",
            }}
          >
            Right answer
          </p>
          <p
            className="txt-wrong"
            style={{
              visibility: rightAnswer === false ? "visible" : "hidden",
            }}
          >
            Wrong answer
          </p>

          <p>Choose this word part of speech:</p>
          <div className="btns-div">
            {wordPos?.map((e, i) => (
              <button
                key={i}
                onClick={answerQuestion}
                name={e}
                disabled={typeof rightAnswer === "boolean"}
              >
                {e}
              </button>
            ))}
          </div>

          <div className="div-next">
            {typeof rightAnswer === "boolean" && <button>Next Question</button>}
          </div>
        </div>
      )}

      {loading && <p>Loading ...</p>}
    </>
  );
};

export default Practice;
