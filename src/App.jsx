import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './Components/Header'
import Slider from "./Components/Slider";
import Discover from "./Components/Discover";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<h1 className="text-center mt-10">Categories</h1>} />
        <Route path="/movies" element={<h1 className="text-center mt-10">Movies Page</h1>} />
        <Route path="/tvshows" element={<h1 className="text-center mt-10">TV Shows Page</h1>} />
        <Route path="/login" element={<h1 className="text-center mt-10">Login</h1>} />
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
