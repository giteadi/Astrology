import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const GlassyNavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%; /* Ensure it spans the container */
  max-width: 100%; /* Prevent overflow beyond the screen width */
  min-width: 320px; /* Set a minimum width to ensure layout integrity */
  height: auto; /* Allow dynamic height */
  border-radius: 9999px;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  margin: 1rem auto; /* Center the navbar horizontally */
  padding: 0.5rem 1rem; /* Adjust padding for small screens */
  font-size: 1rem;
  color: white;
  box-sizing: border-box; /* Include padding and border in width/height */
  overflow: hidden; /* Prevent content from spilling out */

  /* Add responsiveness */
  @media (max-width: 768px) {
    flex-direction: column; /* Stack items vertically on smaller screens */
    font-size: 0.9rem;
    padding: 0.5rem; /* Reduce padding */
  }

  @media (max-width: 400px) {
     /* Further reduce padding for very small screens */
    max-width: 95%; /* Leave some margin for tiny screens */
  }
`;

const NavItem = styled(Link)`
  margin: 0 1rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  color: inherit;

  &:hover {
    color: rgba(255, 255, 255, 1);
  }

  /* Adjust spacing and size for small screens */
  @media (max-width: 768px) {
    margin: 0.5rem 0;
  }

  @media (max-width: 400px) {
    font-size: 0.8rem; /* Reduce font size for very small screens */
    margin: 0.3rem 0; /* Reduce margin */
    text-align: center; /* Center-align text */
  }
`;

const GlassyNav = () => {
  return (
    <GlassyNavContainer>
      <NavItem to="/numerology">Numerology</NavItem>
      <span>|</span>
      <NavItem to="/astrology">Astrology</NavItem>
      <span>|</span>
      <NavItem to="/vastu">Vastu</NavItem>
    </GlassyNavContainer>
  );
};

export default GlassyNav;
