import React from "react";
import { FaStar } from "react-icons/fa";
import styled from "styled-components";
import TriangularCarousel from "../components/TriangularCarousal";
import SquareCarousel from "../components/SquareCarosal";
import GlassyNav from "../components/GlassyNav";
import Nav from "../components/Nav";
import DownwardCarousel from '../components/DownwardTriangle'
import About from './AboutUs'
import Testimonials from '../components/Testimonials'
import Blogs from '../components/BlogList'
// HomeContainer with galaxy-inspired gradient background
const HomeContainer = styled.div`
  background: linear-gradient(to bottom, #12002f, #29004e, #3e32c6);
  min-height: 100vh;
  padding: 2rem;
  color: white;
  text-align: center;
  position: relative; /* Make it the container for absolute positioning of stars */
  overflow: hidden; /* Prevent scrolling from showing stars out of bounds */

  /* Create animated stars */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    z-index: -1; /* Ensure stars are behind the content */
    pointer-events: none;
  }

  /* Create 100 stars */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    z-index: -1;
    pointer-events: none;
  }

  /* Create multiple animated stars */
  .star {
    position: absolute;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background-color: white;
    animation: twinkle 3s infinite alternate;
  }

  /* Randomize positions and opacity of stars */
  @keyframes twinkle {
    0% {
      opacity: 0.2;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.2;
    }
  }

  /* Generate random stars */
  .star:nth-child(1) {
    top: 20%; left: 15%; animation-duration: 4s;
  }
  .star:nth-child(2) {
    top: 40%; left: 30%; animation-duration: 5s;
  }
  .star:nth-child(3) {
    top: 60%; left: 45%; animation-duration: 6s;
  }
  .star:nth-child(4) {
    top: 70%; left: 60%; animation-duration: 7s;
  }
  .star:nth-child(5) {
    top: 30%; left: 80%; animation-duration: 8s;
  }

  /* Add more stars if needed */
`;

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

const CarouselWrapper = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3),
    inset 0 0 15px rgba(255, 255, 255, 0.1);
  padding: 2rem;
  margin: 2rem auto;
  width: 90%;
  max-width: 1200px;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1rem;
    width: 100%;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    width: 100%;
  }
`;

export default function Home() {
  return (
    <div>
      <Nav />
      <HomeContainer>
        {/* Generate 50 Stars */}
        {[...Array(500)].map((_, index) => (
          <div key={index} className="star" style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 2 + 3}s`, // Random durations
            animationDelay: `${Math.random() * 2}s` // Random delays
          }} />
        ))}

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
        <Title>Astrology</Title>
        <CarouselWrapper>
          <TriangularCarousel />
        </CarouselWrapper>

        {/* Section Title */}
        <Title>Vastu</Title>

        {/* Square Carousel with Glassmorphism Wrapper */}
        <CarouselWrapper>
          <SquareCarousel />
        </CarouselWrapper>

        {/* Downward Triangle Section with Glassmorphism */}
        <Title>Numerology</Title>
        <CarouselWrapper>
          <DownwardCarousel />
        </CarouselWrapper>
        <About/>
        <Blogs/>
        <Testimonials/>
      </HomeContainer>
    </div>
  );
}
