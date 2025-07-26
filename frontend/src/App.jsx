// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import './app.css' // <-- Make sure this is here!
// import BoardPage from "./pages/BoardPage";


function App() {
  return (
    <Router>      
      <Routes>
        <Route path="/home/*" element={<HomePage />} />
        {/* <Route path="/board" element={<BoardPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
