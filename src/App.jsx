import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './Components/Header'
import Slider from "./Components/Slider";
import Discover from "./Components/Discover";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import ListMovie from "./Pages/ListMovie";
import MovieDetail from "./Pages/MovieDetail";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/movies" element={<h1 className="text-center mt-10">Movies Page</h1>} />
        <Route path="/tvshows" element={<h1 className="text-center mt-10">TV Shows Page</h1>} />
        <Route path="/login" element={<h1 className="text-center mt-10">Login</h1>} />
        <Route path="/category/:id" element={<ListMovie />} />
        <Route path="/detail/movie/:id" element={<MovieDetail />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
