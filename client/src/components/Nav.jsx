import React from 'react';

const Nav = () => {
  return (
    <nav className="bg-gradient-to-r from-indigo-900 to-purple-900 p-4 text-white">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold"> 
          <img src="data:image/jpeg;base64,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" alt="Logo" className="h-8 w-8" />
        </div>

        {/* Search Bar */}
        {/* <div className="flex-1 mx-4">
          <input
            type="text"
            placeholder="Search what you are looking for..."
            className="w-full p-2 rounded-full text-black placeholder-gray-500"
          />
        </div> */}

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
