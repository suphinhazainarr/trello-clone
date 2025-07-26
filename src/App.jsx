import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        {/* <Board /> */}
      </div>
    </div>
    </>
  )
}

export default App
