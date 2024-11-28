import React from "react";
import { FaStar } from "react-icons/fa";
import TriangularCarousel from "../components/TriangularCarousal";
import SquareCarousel from "../components/SquareCarosal";
import styled from "styled-components";
import Searchbar from "../components/Searchbar";
import StyledDownwardTriangle from "../components/DownwardTriangle"; // Correct import
import AboutUs from "./AboutUs";
import TestimonialsSection from "../components/Testimonials";
import FAQ from "../components/FAQ";
import BlogList from "../components/BlogList";
import DownwardCarousel from "../components/DownwardTriangle";

// HomeContainer with galaxy-inspired gradient background
const HomeContainer = styled.div`
  background: linear-gradient(to bottom, #12002f, #29004e, #3e32c6); /* Darker top gradient transitioning to galaxy gradient */
  min-height: 100vh;
  padding: 2rem;
  color: white;
  text-align: center;
  overflow: hidden; /* Prevent overflow due to animations */

  /* Add animated stars */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("/path/to/stars.png") repeat; /* Replace with your starry texture */
    opacity: 0.1;
    animation: twinkle 20s infinite alternate;
    z-index: 0;
  }

  @keyframes twinkle {
    0% {
      opacity: 0.1;
    }
    50% {
      opacity: 0.2;
    }
    100% {
      opacity: 0.1;
    }
  }
`;

// Styled Title with glowing gradient text
const Title = styled.h2`
  margin: 2rem 0;
  background: linear-gradient(180deg, #ffffff, #6a0dad);
  -webkit-background-clip: text;
  color: transparent;
  font-weight: bold;
  font-size: 2.5rem;
  text-transform: uppercase;
  position: relative;
  display: inline-block;

  .blinking-icon {
    position: absolute;
    left: -45px;
    top: 0;
    font-size: 2rem;
    animation: blink 3s ease-in-out infinite;
    color: white;
  }

  @keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.3;
    }
    100% {
      opacity: 1;
    }
  }
`;

// StarContainer with pulse animations
const StarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 20px;

  .star {
    animation: pulse 2s ease-in-out infinite;
    color: white;
  }

  .star-big {
    font-size: 3rem;
    animation-duration: 2s;
  }

  .star-medium {
    font-size: 2rem;
    animation-duration: 2.5s;
  }

  .star-small {
    font-size: 1.5rem;
    animation-duration: 3s;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`;

// CarouselWrapper to add a glassmorphism effect
const CarouselWrapper = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3), inset 0 0 15px rgba(255, 255, 255, 0.1);
  padding: 2rem;
  margin: 2rem auto;
  width: 90%;
  max-width: 1200px;

  /* Flex alignment for horizontal centering */
  display: flex;
  justify-content: center;
  align-items: center;

  /* Ensure proper responsiveness */
  @media (max-width: 768px) {
    padding: 1rem;
    width: 100%;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    width: 100%;
  }
`;
const DownwardCarouselWrapper = styled.div`
  display: flex;
  flex-direction: row; /* Ensure horizontal alignment */
  justify-content: center;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column; /* Switch to vertical for smaller screens */
    align-items: center;
  }
`;


export default function Home() {
  return (
    <HomeContainer>
      {/* Search bar at the top */}
      <Searchbar />

      {/* Section Title */}
      <Title>
        <span className="blinking-icon">✨</span> What We Offer
      </Title>

      {/* Animated Star Icons */}
      <StarContainer>
        <FaStar className="star star-big" />
        <FaStar className="star star-medium" />
        <FaStar className="star star-small" />
      </StarContainer>

      {/* Triangular Carousel with Glassmorphism Wrapper */}
      <CarouselWrapper>
        <TriangularCarousel />
      </CarouselWrapper>

      {/* Section Title */}
      <Title>Astrology Reports</Title>

      {/* Square Carousel with Glassmorphism Wrapper */}
      <CarouselWrapper>
        <SquareCarousel />
      </CarouselWrapper>

      {/* Downward Triangle Section with Glassmorphism */}
      <Title>
        <h3>Explore Our Services</h3>
      </Title>
      <CarouselWrapper>
        <DownwardCarousel />
      </CarouselWrapper>

      {/* About Us Section */}
      <AboutUs />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <FAQ />

      {/* Blog List Section */}
      <BlogList />
    </HomeContainer>
  );
}
