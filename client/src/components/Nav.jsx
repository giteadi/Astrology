import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FiMenu, FiUser, FiShoppingCart } from "react-icons/fi"; // Import the cart icon
import mercuryImage from "../assets/mercury.webp";

// Keyframes for star twinkle
const twinkle = keyframes`
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
`;

// Keyframes for magical light
const glow = keyframes`
  0% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.5); opacity: 1; }
  100% { transform: scale(1); opacity: 0.7; }
`;

// Styled Navbar
const Navbar = styled.nav`
  background: linear-gradient(90deg, #1c1c3d, #4b0082);
  padding: 4rem 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  position: relative;
  overflow: hidden;
  z-index: 10;
  height: 100px;

  @media (max-width: 768px) {
    padding: 1.5rem 1.5rem;
    height: 80px;
  }
`;

// Magical Light Effect
const MagicalLight = styled.div`
  position: absolute;
  top: -10%;
  left: 50%;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.8), transparent);
  border-radius: 50%;
  transform: translateX(-50%);
  animation: ${glow} 3s infinite;
  z-index: 0;
`;

// Stars Container
const Stars = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`;

// Individual Star
const Star = styled.div`
  position: absolute;
  width: 3px;
  height: 3px;
  background: white;
  border-radius: 50%;
  animation: ${twinkle} 2s infinite;
  opacity: 0.5;

  top: ${({ top }) => top}%;
  left: ${({ left }) => left}%;
`;

// Logo
const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

// Styled Image
const Image = styled.img`
  height: 50px;
  width: 50px;

  @media (max-width: 768px) {
    height: 40px;
    width: 40px;
  }
`;

// Hamburger and Profile Container
const IconButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  z-index: 1;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

// Menu Icon
const MenuIcon = styled.div`
  cursor: pointer;
  color: white;

  @media (min-width: 769px) {
    display: none;
  }
`;

// Profile and Cart Icons
const IconButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  color: white;
  font-size: 1.5rem;

  &:hover {
    color: #ddd;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

// Mobile Menu
const MobileMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  text-align: center;
  padding: 1rem 0;

  a {
    display: block;
    color: white;
    text-decoration: none;
    margin: 0.5rem 0;

    &:hover {
      color: #ddd;
    }
  }
`;

const Nav = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const stars = Array.from({ length: 50 }).map((_, index) => (
    <Star
      key={index}
      top={Math.random() * 100}
      left={Math.random() * 100}
      style={{
        animationDuration: `${Math.random() * 2 + 1}s`,
      }}
    />
  ));

  return (
    <Navbar>
      <Logo>
        <Image src={mercuryImage} alt="Logo" />
        <span className="md:ml-5">Astrology</span>
      </Logo>
      {/* <MagicalLight /> */}
      <Stars>{stars}</Stars>
      <IconButtons>
      <IconButton>
          <FiShoppingCart /> 
        </IconButton>
        <MenuIcon onClick={() => setMenuOpen(!isMenuOpen)}>
          <FiMenu size={24} />
        </MenuIcon>
        <IconButton>
          <FiUser />
        </IconButton>
      
      </IconButtons>
      <MobileMenu isOpen={isMenuOpen}>
        <a href="#">Home</a>
        <a href="#">Products</a>
        <a href="#">Services</a>
        <a href="#">About Us</a>
        <a href="#">Contact</a>
      </MobileMenu>
    </Navbar>
  );
};

export default Nav;
