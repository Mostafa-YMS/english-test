import { Route, Routes } from "react-router-dom";
import Practice from "./pages/practice";
import Rank from "./pages/Rank";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Practice />} />
      <Route path="/rank" element={<Rank />} />
    </Routes>
  );
};

export default App;
