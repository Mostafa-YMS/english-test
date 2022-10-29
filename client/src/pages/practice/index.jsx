import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getWordsService } from "../../services";
import "../../styles/practice.css";

const wordPos = ["verb", "adverb", "noun", "adjective"];

const Practice = () => {
  const navigate = useNavigate();
  const [words, setWords] = useState();
  const [score, setScore] = useState(0);
  const [rightAnswer, setRightAnswer] = useState();
  const [loading, setLoading] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);
  const [progress, setProgress] = useState(0);

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
    } else {
      setRightAnswer(false);
    }
    setProgress((prev) => prev + 1);
  };

  const nextQuestion = () => {
    if (currentWord < 9) {
      setCurrentWord((prev) => prev + 1);
      setRightAnswer();
    }
  };

  const toRank = () => {
    localStorage.setItem("score", score);
    navigate("/rank");
  };

  return (
    <>
      {words && !loading && (
        <div className="paper">
          <div
            className="progress-bar"
            style={{ width: `${(progress / 10) * 100}%` }}
          ></div>
          <h2>Practice</h2>

          <p className="word">
            {currentWord + 1}- {words[currentWord]?.word}
          </p>

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
            {typeof rightAnswer === "boolean" && currentWord !== 9 && (
              <button onClick={nextQuestion}>Next Question</button>
            )}
          </div>

          <div className="div-next">
            {rightAnswer !== undefined && currentWord === 9 && (
              <button onClick={toRank}>Show Rank</button>
            )}
          </div>
        </div>
      )}

      {loading && <p>Loading ...</p>}
    </>
  );
};

export default Practice;
