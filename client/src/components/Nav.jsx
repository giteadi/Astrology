import React, { useState } from "react";
import styled from "styled-components";
import { FiMenu, FiUser, FiShoppingCart, FiHome } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../Redux/AuthSlice";
import mercuryImage from "../assets/mercury.webp";
import rays from "../assets/sitare2.mp4"; // Import the video file

// Styled Components
const Navbar = styled.nav`
  position: relative;
  background: radial-gradient(circle, #29004e, #3e32c6);
  padding: 2rem 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  z-index: 10;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 1.5rem 1.5rem;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  z-index: 2;
  gap: 10px;

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
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 100%;
    margin-top: 1rem;
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

// Styled component for the video
const RaysVideo = styled.video`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%; 
  height: 100%;
  object-fit: cover;
  z-index: 1; /* Place it below the navbar elements */
  pointer-events: none; /* Ensure it doesn't block interactions */
  opacity: 0.5; /* Blend the video with the background */
`;

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

  return (
    <Navbar>
      {/* Video added to the left of the navbar */}
      <RaysVideo autoPlay loop muted>
        <source src={rays} type="video/mp4" />
        Your browser does not support the video tag.
      </RaysVideo>

      <Logo>
        <Image src={mercuryImage} alt="Logo" />
        <span>Astrology</span>
      </Logo>
      <IconButtons>
        <Link to="/">
          <FiHome style={{ fontSize: "1.5rem", cursor: "pointer" }} />
        </Link>

        {isAuthenticated && (
          <Link to="/cart">
            <FiShoppingCart style={{ fontSize: "1.5rem", cursor: "pointer" }} />
          </Link>
        )}

        {isAuthenticated ? (
          <>
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
