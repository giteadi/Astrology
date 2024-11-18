// src/pages/Numerology.jsx
import React from "react";
import SquareCarousel from "../components/SquareCarosal"; // If you want to keep the carousel here
import styled from "styled-components";

// Create a StyledContainer with the same background as in Home.jsx
const StyledContainer = styled.div`
  background: linear-gradient(90deg, #1c1c3d, #4b0082); /* Blue background */
  min-height: 100vh;
  padding: 2rem;
  color: white;
  text-align: center;
`;

const Numerology = () => {
  return (
    <StyledContainer>
      <h1>Numerology</h1>
      <p>
        Dive into the ancient science of Numerology and uncover how your name and birth date can unlock the hidden meanings behind your life path, strengths, and challenges.
      </p>
      <SquareCarousel /> {/* Optional: Include a carousel if needed */}
    </StyledContainer>
  );
};

export default Numerology;
