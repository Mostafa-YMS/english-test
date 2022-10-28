import { Route, Routes } from "react-router-dom";
import Practice from "./pages/practice";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Practice />} />
    </Routes>
  );
}

export default App;
