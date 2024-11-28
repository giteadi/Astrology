import React from "react";
import { FiShoppingCart, FiHome } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../Redux/AuthSlice";
import styled from "styled-components";
import mercuryImage from "../assets/mercury.webp";
import backgroundImage from "../assets/bg.jpg";
import Searchbar from '../components/Searchbar'

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
  width: 100%; /* Make it span the full width */
  height: 140%; /* Increase the height to make it bigger */
  object-fit: cover; /* Ensure the video covers the area without distortion */
  opacity: 0.3;
  pointer-events: none;
  filter: brightness(1.3);
  clip-path: none; /* Remove the clip-path to make sure the whole video is visible */

  /* Responsive adjustments */
  @media (max-width: 768px) {
    height: 120%; /* Adjust height for smaller screens */
  }

  @media (max-width: 480px) {
    height: 100%; /* Further adjust height for very small screens */
  }
`;

const ImageBackground = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: url(${backgroundImage}) no-repeat center top/cover; /* Ensures it stays centered at the top */
  overflow: hidden;
  background-size: cover; /* Maintain aspect ratio */
  background-position: top center; /* Align the top of the image */
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

const SearchbarContainer = styled.div`
  position: absolute;
  top: 20%; /* Shifted slightly upwards from the center */
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  width: 60%; /* Adjust width for responsiveness */
  max-width: 600px; /* Max width to prevent it from being too large on bigger screens */
  
  @media (max-width: 768px) {
    top: 25%; /* Adjust top for smaller screens */
    width: 80%; /* Take more width on smaller screens */
  }

  @media (max-width: 480px) {
    top: 30%; /* Adjust top further for very small screens */
    width: 90%; /* Take almost full width */
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

      {/* Searchbar */}
      <SearchbarContainer>
        <Searchbar />
      </SearchbarContainer>
    </Navbar>
  );
};

export default Nav;
