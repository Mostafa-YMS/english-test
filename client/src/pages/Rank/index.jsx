import { submitScoreService } from "../../services";
import "../../styles/rank.css";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

const Rank = () => {
  const navigate = useNavigate();
  const [rank, setRank] = useState();
  const [loading, setLoading] = useState(false);

  const getRank = useCallback(async () => {
    try {
      setLoading(true);
      const score = localStorage.getItem("score");
      console.log(score);

      if (score) {
        const data = await submitScoreService({ score: score * 10 });
        console.log(data);
        setRank(data);
      } else {
        navigate && navigate("/");
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    getRank && getRank();
  }, [getRank]);

  const toPractice = () => navigate("/");

  return (
    <>
      {loading && <p>Loading ...</p>}

      {rank && (
        <div className="main">
          <p
            style={{
              color: `rgba(${255 - (rank * 255) / 100}, ${
                (255 * rank) / 100
              }, 0)`,
            }}
          >
            Your rank is {rank}%
          </p>
          <button onClick={toPractice}>Try again</button>
        </div>
      )}
    </>
  );
};

export default Rank;
