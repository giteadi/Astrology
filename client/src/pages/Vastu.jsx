// src/pages/Vastu.jsx
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

const Vastu = () => {
  return (
    <StyledContainer>
      <h1>Vastu</h1>
      <p>
        Learn about Vastu, the ancient science of architecture, designed to
        harmonize the energy flow in your living and working spaces.
      </p>
      <SquareCarousel /> {/* You can include the carousel here if you want */}
    </StyledContainer>
  );
};

export default Vastu;
