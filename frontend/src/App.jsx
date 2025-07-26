// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BoardForm from "./pages/BoardForm";
import './app.css' // <-- Make sure this is here!
import Navbar from "./components/Navbar";

function App() {
  return (
<Router>
      <div className="flex flex-col h-screen">
        <Navbar /> {/* Always on top */}
          <Routes>
            <Route path="/create-board" element={<BoardForm />} />
            <Route path="/home/*" element={<HomePage />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
