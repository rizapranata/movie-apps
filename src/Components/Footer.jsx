import React from 'react'
import logogrey from '../assets/Images/movielogogrey.png'

function Footer() {
  return (
    <div className="bg-secondary flex flex-col md:flex-row items-center justify-between py-4 px-6 md:px-12 lg:px-20 text-center md:text-left">
      <div className="text-gray-400 text-sm md:text-base">© 2021 MoovieTime. All rights reserved.</div>
      <div className="my-2 md:my-0">
        <img src={logogrey} className="w-16 md:w-20 object-cover shadow-md" alt="Logo" />
      </div>
      <div className="text-gray-400 text-sm md:text-base">Made with ReactJS</div>
    </div>
  )
}

export default Footer
