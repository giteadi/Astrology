// src/pages/AstroNumerology.jsx
import React from "react";
import SquareCarousel from "../components/SquareCarosal"; // Import SquareCarousel component
import styled from "styled-components";

// Create a StyledContainer with the same background as in Home.jsx
const StyledContainer = styled.div`
  background: linear-gradient(90deg, #1c1c3d, #4b0082); /* Blue background */
  min-height: 100vh;
  padding: 2rem;
  color: white;
  text-align: center;
`;

const AstroNumerology = () => {
  return (
    <StyledContainer>
      <h1>Astro Numerology</h1>
      <p>
        Explore the world of Astro Numerology and discover how the powerful
        energies of numbers and astrology intertwine to influence your life.
      </p>
      <SquareCarousel /> {/* You can include the carousel here if you want */}
    </StyledContainer>
  );
};

export default AstroNumerology;
