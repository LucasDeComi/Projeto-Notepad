import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { HashRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Notepad from "./pages/Notepad"
import "./index.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notepad/:notepad" element={<Notepad />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
)
