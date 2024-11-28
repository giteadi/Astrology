import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 1rem;
  position: relative; /* Provide positioning context */
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
  top: calc(100% + 0.5rem); /* Below the input */
  left: 0;
  right: 0; /* Align with input width */
  margin: auto; /* Center horizontally */
  width: 100%;
  max-width: 32rem;
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  z-index: 10;
  overflow: hidden; /* Ensure smooth clipping for animations */

  /* Animation styles */
  opacity: 0;
  transform: translateY(-10px); /* Start slightly above */
  transition: opacity 0.3s ease, transform 0.3s ease;

  &.open {
    opacity: 1;
    transform: translateY(0); /* Slide into view */
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

  const clearSearch = () => {
    setQuery("");
    setFilteredSuggestions([]);
  };

  return (
    <SearchWrapper>
      <SearchInputWrapper>
        <SearchInput
          type="text"
          placeholder="Search for Astrology, Numerology, Vastu..."
          value={query}
          onChange={handleInputChange}
        />
        <SearchIcon>
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
    </SearchWrapper>
  );
}
