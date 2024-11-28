import React from "react";
import { FiShoppingCart, FiHome } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../Redux/AuthSlice";
import styled from "styled-components";
import mercuryImage from "../assets/mercury.webp";
import backgroundImage from "../assets/bg.jpg";

// Styled-components
const Navbar = styled.nav`
  position: relative;
  width: 100%;
  height: 100vh; /* Full screen height */
  overflow: hidden;
  color: white;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120%;
  object-fit: cover;
  opacity: 0.6;
  pointer-events: none;
  filter: brightness(1.3);
  clip-path: polygon(0 0, 100% 0, 100% 90%, 0 85%);

  /* Responsive adjustments */
  @media (max-width: 768px) {
    height: 100%;
    clip-path: polygon(0 0, 100% 0, 100% 95%, 0 90%);
  }

  @media (max-width: 480px) {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 95%);
  }
`;

const ImageBackground = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: url(${backgroundImage}) no-repeat center center/cover;
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

    /* Responsive adjustments */
    @media (max-width: 768px) {
      height: 3rem;
    }

    @media (max-width: 480px) {
      height: 2.5rem;
    }
  }
`;

const TopMenu = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 10;

  a,
  button {
    font-size: 1.25rem;
    color: white;
    text-decoration: none;
    background: transparent;
    border: none;
    cursor: pointer;

    &:hover {
      color: #ffdf00;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      font-size: 1rem;
    }

    @media (max-width: 480px) {
      font-size: 0.875rem;
    }
  }
`;

const Menu = styled.div`
  position: absolute;
  bottom: 2rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  z-index: 10;

  a {
    font-size: 1.25rem;
    color: white;
    text-decoration: none;

    &:hover {
      color: #ffdf00;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      font-size: 1rem;
    }

    @media (max-width: 480px) {
      font-size: 0.875rem;
    }
  }

  span {
    font-size: 1.25rem;

    /* Responsive adjustments */
    @media (max-width: 768px) {
      font-size: 1rem;
    }

    @media (max-width: 480px) {
      font-size: 0.875rem;
    }
  }
`;

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <Navbar>
      {/* Background Section */}
      <ImageBackground>
        {/* Video */}
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
          Your browser does not support the video tag.
        </VideoBackground>
      </ImageBackground>

      {/* Logo */}
      <LogoContainer>
        <img src={mercuryImage} alt="Logo" />
      </LogoContainer>

      {/* Top Menu (Login and Home) */}
      <TopMenu>
        <Link to="/">
          <FiHome />
        </Link>
        {isAuthenticated ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </TopMenu>

      {/* Bottom Menu */}
      {isAuthenticated && (
        <Menu>
          <Link to="/cart">
            <FiShoppingCart />
          </Link>
          <span>Hi, {user?.name || "User"}</span>
        </Menu>
      )}
    </Navbar>
  );
};

export default Nav;
