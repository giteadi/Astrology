import React from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchbarWithOptions() {
  return (
    <div className="flex flex-col items-center md:pt-5 px-4">
      {/* Searchbar */}
      <div className="relative w-full max-w-lg md:max-w-lg">
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-12 pr-5 py-4 sm:py-3 md:py-4 bg-transparent border border-gray-300 rounded-full text-white text-sm md:text-lg focus:outline-none focus:border-blue-500 backdrop-blur-sm"
          style={{
            background: "rgba(255, 255, 255, 0.15)",
          }}
        />
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300">
          <FaSearch className="w-6 h-6" />
        </span>
      </div>

      {/* Options */}
      <div className="backdrop-blur-md bg-[rgba(255,255,255,0.1)] shadow-lg rounded-3xl flex justify-around items-center gap-4 md:gap-6 p-4 md:p-8 w-full max-w-3xl mt-6 border border-white">
        <span className="text-white text-sm md:text-lg font-semibold cursor-pointer hover:text-gray-300">
          Astrology
        </span>
        <div className="h-6 md:h-8 w-px bg-white"></div>
        <span className="text-white text-sm md:text-lg font-semibold cursor-pointer hover:text-gray-300">
          Vastu
        </span>
        <div className="h-6 md:h-8 w-px bg-white"></div>
        <span className="text-white text-sm md:text-lg font-semibold cursor-pointer hover:text-gray-300">
          Numerology
        </span>
      </div>
    </div>
  );
}
