import React from "react";
import { FiShoppingCart, FiHome } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../Redux/AuthSlice";
import styled from "styled-components";
import mercuryImage from "../assets/mercury.webp";

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

  @media (max-width: 768px) {
    padding: 1rem;
    flex-wrap: nowrap;
  }
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.7;
  pointer-events: none;
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
      color: #ffdf00;
    }
  }
`;

const LogoutButton = styled.button`
  background: transparent;
  border: 1px solid white;
  color: white;
  padding: 0.25rem 0.75rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: white;
    color: #29004e;
  }
`;

const LoginButton = styled.button`
  background: transparent;
  border: 1px solid white;
  color: white;
  padding: 0.25rem 0.75rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: white;
    color: #29004e;
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
      {/* Video Background */}
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

      {/* Logo */}
      <LogoContainer>
        <img src={mercuryImage} alt="Logo" />
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
          <Link to="/login">
            <LoginButton>Login</LoginButton>
          </Link>
        )}
      </Menu>
    </Navbar>
  );
};

export default Nav;
