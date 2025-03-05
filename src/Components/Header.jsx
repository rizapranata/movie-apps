import React, { useEffect } from 'react'
import logo from '../assets/Images/movielogo.png'
import iconfinder from '../assets/Images/iconfinder.png'
import searchIcon from '../assets/Images/search-icon.png'
import { useState } from "react";
import { Link } from "react-router-dom";
import GlobalApi from '../Services/GlobalApi';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const data = await GlobalApi.getGenres();
      setGenres(data.genres);
    };

    fetchGenres();
  }, []);

  return (//bg-opacity-50 -> untuk transparan
    <nav className="bg-primary text-white p-4 fixed top-0 left-0 w-full z-10 sm:px-5 md:px-[20px] sm:px-[20px] md:px-40 lg:px-50 xl:px-60">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo & Search */}
        <div className="flex items-center space-x-4 md:space-x-7">
          <Link to="/" className="text-xl font-bold">
            <img src={logo} className="w-[80px] md:w-[115px] object-cover" />
          </Link>
          {/* Search Input */}
          <div className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Find movie.."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-secondary px-4 py-1 pr-10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-400 w-40 sm:w-60 md:w-72 lg:w-80"
            />
            <img
              src={searchIcon}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
            />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* Navigation Links */}
        <ul
          className={`absolute md:relative top-14 md:top-0 left-0 w-full md:w-auto bg-primary md:bg-transparent p-4 md:p-0 md:flex items-center space-y-4 md:space-y-0 md:space-x-8 transition-all duration-300 ${isOpen ? "block" : "hidden"
            } md:block`}
        >
          {/* Dropdown Categories */}
          <li className="relative group">
            <div className="flex items-center cursor-pointer">
              <img
                src={iconfinder}
                className="w-5 h-5 object-cover mr-2 hidden md:block"
              />
              CATEGORIES
            </div>

            <ul className="absolute left-0 mt-0 w-40 bg-white text-black shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
              {genres.map((category) => (
                <li key={category.id} className="hover:bg-gray-200 px-4 py-1">
                  <Link to={`/category/${category.id}`} className="block">
                    {category.name.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          <li>
            <Link to="/movies" className="hover:text-gray-300">
              MOVIES
            </Link>
          </li>
          <li>
            <Link to="/tvshows" className="hover:text-gray-300">
              TV SHOWS
            </Link>
          </li>
          <li>
            <Link to="/login" className="hover:text-gray-300">
              LOGIN
            </Link>
          </li>
        </ul>
      </div>
    </nav>


  )
}

export default Header
