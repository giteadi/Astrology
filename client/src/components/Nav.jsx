import React, { useState, useRef, useEffect } from "react";
import { FiMenu, FiUser, FiShoppingCart, FiHome } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../Redux/AuthSlice";
import styled from "styled-components";
import mercuryImage from "../assets/mercury.webp";
import rays from "../assets/top2.mp4";

// Styled-components
const Navbar = styled.nav`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: linear-gradient(to right, #29004e, #3e32c6);
  color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  /* Responsive adjustments for smaller screens */
  @media (max-width: 768px) {
    padding: 1rem;
    flex-wrap: nowrap; /* Prevent breaking into rows */
  }
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Maintain video scaling */
  object-position: center; /* Center the video content */
  opacity: 0.7;
  pointer-events: none;

  /* Mobile-specific adjustments to maintain proportions */
  @media (max-width: 768px) {
    top: 0; /* Align video with top */
    height: 100%; /* Ensure full height scaling */
    object-position: center; /* Center the video */
  }

  @media (max-width: 480px) {
    top: 0;
    height: 100%; /* Full height for phones */
    object-position: center; /* Keep video centered */
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  z-index: 10;

  img {
    height: 3rem;
    width: 3rem;
    margin-right: 0.5rem;
  }

  @media (max-width: 768px) {
    font-size: 1.25rem; /* Adjust font size for tablets */
  }

  @media (max-width: 480px) {
    font-size: 1rem; /* Adjust font size for phones */
  }
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 10;

  a {
    font-size: 1.25rem;
    color: white;
    text-decoration: none;

    &:hover {
      color: #ffcc00;
    }
  }

  @media (max-width: 768px) {
    gap: 0.75rem;
    a {
      font-size: 1rem; /* Adjust size for tablets */
    }
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
    a {
      font-size: 0.875rem; /* Adjust size for phones */
    }
  }
`;

const LogoutButton = styled.button`
  background: transparent;
  border: 1px solid white;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: white;
    color: #29004e;
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.875rem;
  }

  @media (max-width: 480px) {
    padding: 0.3rem 0.6rem;
    font-size: 0.75rem;
  }
`;

// Component
const Nav = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <Navbar>
      <VideoBackground autoPlay loop muted>
        <source src={rays} type="video/mp4" />
        Your browser does not support the video tag.
      </VideoBackground>

      {/* Logo */}
      <LogoContainer>
        <img src={mercuryImage} alt="Logo" />
        <span>Astrology</span>
      </LogoContainer>

      {/* Menu */}
      <Menu>
        <Link to="/">
          <FiHome />
        </Link>

        {isAuthenticated && (
          <Link to="/cart">
            <FiShoppingCart />
          </Link>
        )}

        {isAuthenticated ? (
          <>
            <span>Hi, {user?.name || "User"}</span>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </>
        ) : (
          <div
            ref={dropdownRef}
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className="relative"
          >
            <FiUser />
          </div>
        )}
      </Menu>
    </Navbar>
  );
};

export default Nav;
