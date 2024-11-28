import React from "react";
import { FaStar } from "react-icons/fa"; // Import React Icon for stars
import TriangularCarousel from "../components/TriangularCarousal";
import SquareCarousel from "../components/SquareCarosal";
import styled from "styled-components";
import Searchbar from "../components/Searchbar";
import DownwardTriangle from "../components/DownwardTriangle";
import AboutUs from "./AboutUs";
import TestimonialsSection from "../components/Testimonials";
import FAQ from "../components/FAQ";
import BlogList from "../components/BlogList";

// HomeContainer with specified gradient background
const HomeContainer = styled.div`
  background: linear-gradient(to bottom, #29004e, #3e32c6); /* Top-to-bottom gradient */
  min-height: 100vh; /* Full viewport height */
  padding: 2rem; /* Spacing for internal content */
  color: white; /* Text color for contrast */
  text-align: center; /* Center align text inside */
`;

// Title component with gradient text and blinking icon effect
const Title = styled.h2`
  margin: 2rem 0;
  background: linear-gradient(180deg, #ffffff 80%, rgba(0, 191, 255, 0.5) 100%);
  -webkit-background-clip: text;
  color: transparent;
  position: relative;
  display: inline-block;
  font-weight: bold;
  font-size: 2.5rem;

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

// StarContainer with animations
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

export default function Home() {
  return (
    <HomeContainer>
      {/* Search bar at the top */}
      <Searchbar/>

      {/* Section Title */}
      <Title className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold my-6">
        WHAT WE OFFER
      </Title>

      {/* Animated Star Icons */}
      <StarContainer>
        <FaStar className="star star-big" />
        <FaStar className="star star-medium" />
        <FaStar className="star star-small" />
      </StarContainer>

      {/* Triangular Carousel */}
      <TriangularCarousel />

      {/* Section Title */}
      <Title className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-6">
        ASTROLOGY REPORTS
      </Title>

      {/* Square Carousel */}
      <SquareCarousel />

      {/* Downward Triangle Section */}
      <DownwardTriangle />

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
