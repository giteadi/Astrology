import React from 'react';

const Nav = () => {
  return (
    <nav className="bg-gradient-to-r from-indigo-900 to-purple-900 p-4 text-white">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold"> 
          <img src="path/to/logo.png" alt="Logo" className="h-8 w-8" />
        </div>

        {/* Search Bar */}
        <div className="flex-1 mx-4">
          <input
            type="text"
            placeholder="Search what you are looking for..."
            className="w-full p-2 rounded-full text-black placeholder-gray-500"
          />
        </div>

        {/* Cart and Profile Icons */}
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full bg-gray-800">
            <span role="img" aria-label="cart">🛒 My Cart</span>
          </button>
          <button className="p-2 rounded-full bg-gray-800">
            <span role="img" aria-label="profile">👤</span>
          </button>
        </div>
      </div>

      {/* Category Buttons */}
      <div className="flex justify-center space-x-4 mt-4">
        <button className="px-4 py-2 bg-white text-indigo-900 rounded-full">Astrology</button>
        <button className="px-4 py-2 bg-white text-indigo-900 rounded-full">Vastu</button>
        <button className="px-4 py-2 bg-white text-indigo-900 rounded-full">Numerology</button>
      </div>
    </nav>
  );
};

export default Nav;
