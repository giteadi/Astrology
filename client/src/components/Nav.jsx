import React from 'react';
import styled, { keyframes } from 'styled-components';
import mercuryImage from '../assets/mercury.webp';

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
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  position: relative;
  overflow: hidden;
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

  /* Random positioning */
  top: ${({ top }) => top}%;
  left: ${({ left }) => left}%;
`;

// Logo
const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  z-index: 1; /* Ensure logo is above effects */
`;

// Styled Image
const Image = styled.img`
  height: 50px;
  width: 50px;
`;

const Nav = () => {
  // Generate stars dynamically
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
      </Logo>
      <MagicalLight />
      <Stars>{stars}</Stars>
    </Navbar>
  );
};

export default Nav;
