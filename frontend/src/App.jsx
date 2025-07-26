// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BoardForm from "./pages/BoardForm";
import './app.css' // <-- Make sure this is here!


function App() {
  return (
    <Router>      
      <Routes>
        <Route path="/create-board" element={<BoardForm />} />
        <Route path="/*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
