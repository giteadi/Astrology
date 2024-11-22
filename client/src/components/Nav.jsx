import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FiMenu, FiUser, FiShoppingCart, FiHome } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { useSelector, useDispatch } from "react-redux"; // Redux hooks
import { logoutUser } from "../Redux/AuthSlice"; // Import logout action
import mercuryImage from "../assets/mercury.webp";

// Keyframes for star twinkle
const twinkle = keyframes`
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
`;

// Styled Components
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

const Stars = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

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

const Image = styled.img`
  height: 50px;
  width: 50px;

  @media (max-width: 768px) {
    height: 40px;
    width: 40px;
  }
`;

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

const UserName = styled.span`
  font-size: 1rem;
  font-weight: bold;
  margin-right: 15px;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-right: 10px;
  }
`;

// Navbar Component
const Nav = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user and authentication state from Redux
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/"); // Navigate to home page on logout
  };

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
        <Link to="/">
          <FiHome style={{ fontSize: "1.5rem", cursor: "pointer" }} />
        </Link>
        
        {/* Conditionally render the cart icon only if the user is authenticated */}
        {isAuthenticated && (
          <Link to="/cart">
            <FiShoppingCart style={{ fontSize: "1.5rem", cursor: "pointer" }} />
          </Link>
        )}

        {isAuthenticated ? (
          <>
            {/* Show user's name */}
            <UserName>{`Hi, ${user?.name || "User"}`}</UserName>
            <button
              onClick={handleLogout}
              style={{
                background: "none",
                border: "1px solid white",
                color: "white",
                padding: "5px 10px",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <div
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            style={{ position: "relative", cursor: "pointer" }}
          >
            <FiUser style={{ fontSize: "1.5rem" }} />
            {isDropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "120%",
                  right: "0",
                  background: "rgba(0, 0, 0, 0.9)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                  padding: "0.5rem 0",
                  zIndex: 5,
                  width: "150px",
                }}
              >
                <Link
                  to="/login"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    display: "block",
                    padding: "0.5rem 1rem",
                    fontSize: "0.9rem",
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    display: "block",
                    padding: "0.5rem 1rem",
                    fontSize: "0.9rem",
                  }}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </IconButtons>
    </Navbar>
  );
};

export default Nav;
