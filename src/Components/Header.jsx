import React from 'react'
import logo from '../assets/Images/movielogo.png'
import iconfinder from '../assets/Images/iconfinder.png'
import searchIcon from '../assets/Images/search-icon.png'
import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (//bg-opacity-50 -> untuk transparan
    <nav className="bg-primary text-white p-4 shadow-lg absolute top-0 left-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-7">
          <Link to="/" className="text-xl font-bold">
            <img src={logo} className='w-[80px] md:w-[115px] object-cover' />
          </Link>
          <div className="relative">
            <input
              type="text"
              placeholder="Find movie.."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-secondary px-5 py-1 pr-10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <img src={searchIcon} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-3 h-3" />
          </div>
        </div>

        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* Links */}
        <ul className={`md:flex space-x-8 ${isOpen ? "block" : "hidden"} md:block`}>
          <li>
            <Link to="/categories" className="hover:text-gray-300">
              <div className='flex'>
                <img src={iconfinder} className='w-[20px] md:w-[20px] md:h-[20px] object-cover mr-2 pt-1 hidden md:block'/>
                CATEGORIES
              </div>
            </Link>
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
