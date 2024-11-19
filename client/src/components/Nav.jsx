import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FiMenu, FiUser, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import mercuryImage from "../assets/mercury.webp";

// Keyframes for star twinkle
const twinkle = keyframes`
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
`;

// Styled Navbar
const Navbar = styled.nav`
  background: linear-gradient(90deg, #1c1c3d, #4b0082);
  padding: 2rem 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  position: relative;
  z-index: 10;

  @media (max-width: 768px) {
    padding: 1.5rem 1.5rem;
  }
`;

// Stars Container
const Stars = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
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
  z-index: 2;

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
  position: relative;
  z-index: 3;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

// Dropdown Menu for Login/Register
const Dropdown = styled.div`
  position: absolute;
  top: 120%;
  right: 0;
  background: rgba(0, 0, 0, 0.9);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  padding: 0.5rem 0;
  z-index: 5;
  width: 150px;

  a {
    color: white;
    text-decoration: none;
    display: block;
    padding: 0.5rem 1rem;
    font-size: 0.9rem;

    &:hover {
      background: #4b0082;
      color: #fff;
    }
  }
`;

const Nav = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleProfileClick = (e) => {
    e.stopPropagation(); // Prevent closing the dropdown when clicking on the profile icon
    setDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = () => {
    setDropdownOpen(false); // Close the dropdown when clicking outside
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
      <Stars>{stars}</Stars>
      <IconButtons>
        {/* Add Link component around the cart icon to navigate to /cart */}
        <Link to="/dashboard">
          <FiShoppingCart style={{ fontSize: "1.5rem", cursor: "pointer" }} />
        </Link>
        <div
          onClick={handleProfileClick}
          style={{
            position: "relative",
            cursor: "pointer",
          }}
        >
          <FiUser style={{ fontSize: "1.5rem" }} />
          {isDropdownOpen && (
            <Dropdown>
              <Link to="/login">Login</Link> {/* Use Link for routing */}
              <Link to="/register">Register</Link> {/* Use Link for routing */}
            </Dropdown>
          )}
        </div>
      </IconButtons>
    </Navbar>
  );
};

export default Nav;
