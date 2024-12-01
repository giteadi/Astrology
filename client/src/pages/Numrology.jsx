// src/pages/Numerology.jsx
import React from "react";
import SquareCarousel from "../components/SquareCarosal"; // If you want to keep the carousel here
import styled from "styled-components";
import Numrology from '../components/DownwardTriangle'
// Create a StyledContainer with the same background as in Home.jsx
const StyledContainer = styled.div`
  background: linear-gradient(90deg, #1c1c3d, #4b0082); /* Blue background */
  min-height: 100vh;
  padding: 2rem;
  color: white;
  text-align: center;
`;

const NumerologyPage = () => {
  return (
    <StyledContainer>
     <Numrology/>
    </StyledContainer>
  );
};

export default NumerologyPage;
