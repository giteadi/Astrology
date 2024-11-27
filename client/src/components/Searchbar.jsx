import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function SearchbarWithOptions() {
  const [query, setQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const services = [
    { name: "Astrology", path: "/astrology" },
    { name: "Numerology", path: "/numerology" },
    { name: "Vastu", path: "/vastu" },
    { name: "Astrology Consultation", path: "/astrology/consultation" },
    { name: "Vastu Tips", path: "/vastu/tips" },
    { name: "Numerology Reports", path: "/numerology/reports" },
  ];

  const handleInputChange = (e) => {
    const input = e.target.value;
    setQuery(input);

    if (input.trim() === "") {
      setFilteredSuggestions([]);
    } else {
      const filtered = services.filter((service) =>
        service.name.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    }
  };

  return (
    <div className="flex flex-col items-center w-full px-4">
      {/* Searchbar */}
      <div className="relative w-full max-w-lg">
        <input
          type="text"
          placeholder="Search for Astrology, Numerology, Vastu..."
          value={query}
          onChange={handleInputChange}
          className="w-full pl-12 pr-5 py-3 text-white text-base md:text-lg rounded-full bg-transparent border border-white/50 focus:outline-none focus:ring-2 focus:ring-white/70 transition-all duration-300"
        />
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70">
          <FaSearch className="w-6 h-6" />
        </span>
      </div>

      {/* Suggestions Dropdown */}
      {filteredSuggestions.length > 0 && (
        <div
          className="absolute mt-2 w-full max-w-lg rounded-lg shadow-xl z-10 overflow-hidden border border-white/50"
          style={{
            background: "rgba(255, 255, 255, 0.1)", // Light transparency
            backdropFilter: "blur(10px)", // Adds subtle blur to dropdown
          }}
          role="listbox"
          aria-label="Search Suggestions"
        >
          {filteredSuggestions.map((suggestion, index) => (
            <Link
              key={index}
              to={suggestion.path}
              className="block px-4 py-2 text-white hover:bg-white/20 focus:bg-white/20 focus:outline-none"
              role="option"
            >
              {suggestion.name}
            </Link>
          ))}
        </div>
      )}

      {/* Options Section */}
      <div
        className="rounded-3xl flex justify-around items-center gap-4 p-4 md:p-6 w-full max-w-3xl mt-6 border border-white/50"
        style={{
          background: "rgba(255, 255, 255, 0.1)", // Transparent background with blur
          backdropFilter: "blur(8px)",
        }}
      >
        <Link
          to="/astrology"
          className="text-white text-sm md:text-lg font-semibold cursor-pointer hover:text-gray-300 transition-all duration-200"
        >
          Astrology
        </Link>
        <div className="h-6 md:h-8 w-px bg-white/30"></div>
        <Link
          to="/vastu"
          className="text-white text-sm md:text-lg font-semibold cursor-pointer hover:text-gray-300 transition-all duration-200"
        >
          Vastu
        </Link>
        <div className="h-6 md:h-8 w-px bg-white/30"></div>
        <Link
          to="/numerology"
          className="text-white text-sm md:text-lg font-semibold cursor-pointer hover:text-gray-300 transition-all duration-200"
        >
          Numerology
        </Link>
      </div>
    </div>
  );
}
