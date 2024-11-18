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
import Footer from "../components/Footer";

// Create the HomeContainer with a blue background
const HomeContainer = styled.div`
  background: linear-gradient(90deg, #1c1c3d, #4b0082); /* Blue background */
  min-height: 100vh;
  padding: 2rem;
  color: white;
  text-align: center;
`;

// Title component with gradient and blinking icon effect
const Title = styled.h2`
  margin: 2rem 0;
  background: linear-gradient(180deg, #ffffff 80%, rgba(0, 191, 255, 0.5) 100%); /* White and light blue spray effect */
  -webkit-background-clip: text;
  color: transparent;
  position: relative;
  display: inline-block;
  font-weight: bold;
  font-size: 2.5rem;

  /* Position the blinking icon to the left of the "W" */
  .blinking-icon {
    position: absolute;
    left: -45px; /* Adjust the position further for better alignment */
    top: 0;
    font-size: 2rem; /* Adjust the size of the icon */
    animation: blink 3s ease-in-out infinite; /* Slow down the blink animation */
    color: white; /* Set icon color to white */
  }

  /* Keyframe animation to make the icon blink */
  @keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.3; /* Reduced opacity for smoother blink */
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

  /* Animate the stars */
  .star {
    animation: pulse 2s ease-in-out infinite;
    color: white; /* Star color */
  }

  .star-big {
    font-size: 3rem; /* Big star */
    animation-duration: 2s;
  }

  .star-medium {
    font-size: 2rem; /* Medium star */
    animation-duration: 2.5s;
  }

  .star-small {
    font-size: 1.5rem; /* Small star */
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
      <Searchbar />
      <Title className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold my-6">
        WHAT WE OFFER
      </Title>

      {/* Star icons with animation */}
      <StarContainer>
        <FaStar className="star star-big" />
        <FaStar className="star star-medium" />
        <FaStar className="star star-small" />
      </StarContainer>

      <TriangularCarousel />
      <Title className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-6">
        ASTROLOGY REPORTS
      </Title>
      <SquareCarousel />
      <DownwardTriangle/>
      <AboutUs/>
      <TestimonialsSection/>
      <FAQ/>
      <BlogList/>
      <Footer/>
    </HomeContainer>
  );
}
