import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../Redux/AuthSlice";
import { FiMenu, FiX, FiUser, FiShoppingCart } from "react-icons/fi";
import mercuryImage from "../assets/mercury.webp";
import backgroundImage from "../assets/bg.jpg";
import Searchbar from "../components/Searchbar";
import GlassyNav from "./GlassyNav";
import styled from "styled-components";

// Styled-components
const Navbar = styled.nav`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  color: white;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 140%;
  object-fit: cover;
  opacity: 0.3;
  pointer-events: none;
  filter: brightness(1.3);
`;

const ImageBackground = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: url(${backgroundImage}) no-repeat center top/cover;
  overflow: hidden;
`;

const LogoContainer = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  align-items: center;
  z-index: 10;

  img {
    height: 4rem;
    width: auto;

    @media (max-width: 768px) {
      height: 3rem;
    }

    @media (max-width: 480px) {
      height: 2.5rem;
    }
  }
`;

const IconContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 10;

  .icon {
    font-size: 1.5rem;
    color: white;
    cursor: pointer;

    @media (max-width: 480px) {
      font-size: 1.2rem;
    }
  }
`;

const ProfileMenu = styled.div`
  position: absolute;
  top: 3rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 5px;
  z-index: 20;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  padding: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);

  button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    text-align: left;
    padding: 0.5rem 0;

    &:hover {
      color: #f0a500;
    }
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  z-index: 30;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  padding: 2rem 1rem;

  .menu-items {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    button {
      background: none;
      border: none;
      color: white;
      font-size: 1.2rem;
      cursor: pointer;
      text-align: left;

      &:hover {
        color: #f0a500;
      }
    }
  }
`;

const MobileMenuIcon = styled.div`
  position: absolute;
  top: 1rem;
  right: 2rem;
  z-index: 20;
  display: none;

  .icon {
    font-size: 2rem;
    color: white;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const SearchbarContainer = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  width: 60%;
  max-width: 600px;

  @media (max-width: 768px) {
    top: 25%;
    width: 80%;
  }

  @media (max-width: 480px) {
    top: 30%;
    width: 90%;
  }
`;

const UsernameContainer = styled.div`
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  color: white;
  font-size: 1.2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
    setProfileMenuOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <Navbar>
      {/* Background Section */}
      <ImageBackground>
        <VideoBackground
          autoPlay
          loop
          muted
          playsInline
          poster="https://res.cloudinary.com/bazeercloud/image/upload/v1732787677/top2_thumbnail.jpg"
        >
          <source
            src="https://res.cloudinary.com/bazeercloud/video/upload/f_auto,q_auto/v1732787677/top2_br0zzc.mp4"
            type="video/mp4"
          />
        </VideoBackground>
      </ImageBackground>

      {/* Logo */}
      <LogoContainer>
        <img src={mercuryImage} alt="Logo" />
      </LogoContainer>

      {/* Username Display (Always visible on all screens) */}
      {isAuthenticated && (
        <UsernameContainer>
          {`Hello, ${user.name}`}
        </UsernameContainer>
      )}

      {/* Icons (Profile & Cart) */}
      <IconContainer>
        {isAuthenticated && (
          <FiShoppingCart
            className="icon"
            title="Cart"
            onClick={() => navigate("/cart")}
          />
        )}
        <FiUser
          className="icon"
          title="Profile"
          onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}
        />
        <ProfileMenu isOpen={isProfileMenuOpen}>
          {!isAuthenticated ? (
            <button onClick={() => navigate("/login")}>Login</button>
          ) : (
            <button onClick={handleLogout}>Logout</button>
          )}
        </ProfileMenu>
      </IconContainer>

      {/* Mobile Menu Icon */}
      <MobileMenuIcon onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? <FiX className="icon" /> : <FiMenu className="icon" />}
      </MobileMenuIcon>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen}>
        <div className="menu-items">
          {isAuthenticated && (
            <div>{`Hello, ${user.name}`}</div>
          )}
          {isAuthenticated ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
          {isAuthenticated && (
            <button onClick={() => navigate("/cart")}>
              <FiShoppingCart /> Cart
            </button>
          )}
        </div>
      </MobileMenu>

      {/* Searchbar */}
      <SearchbarContainer>
        <Searchbar />
      </SearchbarContainer>

      {/* Glassy Navigation Bar */}
      <GlassyNav />
    </Navbar>
  );
};

export default Nav;
