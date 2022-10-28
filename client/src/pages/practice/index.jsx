import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getWordsService } from "../../services";

const Practice = () => {
  const [words, setWords] = useState();
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

  return <div>Practice</div>;
};

export default Practice;
