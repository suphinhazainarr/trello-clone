// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
// import BoardPage from "./pages/BoardPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/board/:id" element={<BoardPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
