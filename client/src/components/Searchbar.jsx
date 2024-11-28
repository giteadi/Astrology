import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 1rem;
  position: relative;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 32rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding-left: 3rem;
  padding-right: 3rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  color: white;
  border-radius: 9999px;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.5);
  outline: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:focus {
    border-color: rgba(255, 255, 255, 0.7);
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
`;

const ClearButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: rgba(255, 255, 255, 1);
  }
`;

const SuggestionsWrapper = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  right: 0;
  margin: auto;
  width: 100%;
  max-width: 32rem;
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  z-index: 10;
  overflow: hidden;

  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 0.3s ease, transform 0.3s ease;

  &.open {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SuggestionItem = styled(Link)`
  display: block;
  padding: 0.75rem 1rem;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const GlassyNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 4rem; /* Adjust the height for the nav */
  border-radius: 9999px;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  margin-top: 1rem;
  padding: 0 2rem;
  font-size: 1.1rem;
  color: white;
`;

const NavItem = styled(Link)`
  margin: 0 1.5rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  color: white;

  &:hover {
    color: rgba(255, 255, 255, 1);
  }
`;

export default function SearchbarWithOptions() {
  const [query, setQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

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

  const clearSearch = () => {
    setQuery("");
    setFilteredSuggestions([]);
  };

  const performSearch = () => {
    // Navigate to the first matching result or show all suggestions
    if (filteredSuggestions.length > 0) {
      navigate(filteredSuggestions[0].path); // Navigate to the first suggestion's path
    } else {
      alert(`No results found for: ${query}`); // Show an alert if no results found
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      performSearch();
    }
  };

  return (
    <SearchWrapper>
      <SearchInputWrapper>
        <SearchInput
          type="text"
          placeholder="Search for Astrology, Numerology, Vastu..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <SearchIcon onClick={performSearch}>
          <FaSearch />
        </SearchIcon>
        {query && (
          <ClearButton onClick={clearSearch}>
            <FaTimes />
          </ClearButton>
        )}
      </SearchInputWrapper>

      {filteredSuggestions.length > 0 && (
        <SuggestionsWrapper className="open">
          {filteredSuggestions.map((suggestion, index) => (
            <SuggestionItem key={index} to={suggestion.path}>
              {suggestion.name}
            </SuggestionItem>
          ))}
        </SuggestionsWrapper>
      )}

      {/* Glassy Navbar for Astrology, Numerology, and Vastu */}
      <GlassyNav>
        <NavItem to="/numerology">Numerology</NavItem>
        <span>|</span>
        <NavItem to="/astrology">Astrology</NavItem>
        <span>|</span>
        <NavItem to="/vastu">Vastu</NavItem>
      </GlassyNav>
    </SearchWrapper>
  );
}
