import React from "react";
import styled, { keyframes, css } from "styled-components";

// Keyframe for cards coming from top to bottom horizontally
const moveFromTop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-100%); /* Start from the top */
  }
  50% {
    opacity: 1;
    transform: translateY(0); /* Move to the normal position */
  }
  100% {
    opacity: 0;
    transform: translateY(100%); /* Move down off-screen */
  }
`;

// Keyframe for cards coming from bottom to top horizontally
const moveFromBottom = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100%); /* Start from the bottom */
  }
  50% {
    opacity: 1;
    transform: translateY(0); /* Move to the normal position */
  }
  100% {
    opacity: 0;
    transform: translateY(-100%); /* Move up off-screen */
  }
`;

// Custom Testimonial Card Styled Component with looping animation
const TestimonialCard = styled.div`
  width: 90%; /* Reduced width */
  max-width: 350px; /* Set a max width */
  background: rgba(255, 255, 255, 0.2); /* Add slight transparency */
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Light shadow for depth */
  padding: 1rem; /* Reduced padding */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem; /* Spacing between content */
  backdrop-filter: blur(10px); /* Subtle blur effect for background */
  text-align: center;
  opacity: 0;
  animation: ${({ animation }) =>
    animation === "top-to-bottom"
      ? css`
          ${moveFromTop} 8s ease-in-out infinite
        `
      : css`
          ${moveFromBottom} 8s ease-in-out infinite
        `};
`;

// Other Styled Components
const TestimonialText = styled.p`
  font-size: 0.875rem; /* Reduced font size */
  color: #fff; /* Light text for visibility on dark background */
  line-height: 1.6;
  font-style: italic;
`;

const AuthorName = styled.h3`
  font-size: 1.125rem; /* Adjusted font size */
  color: #fff; /* White color for name */
  font-weight: 600;
`;

const AuthorPosition = styled.p`
  font-size: 0.875rem; /* Reduced font size */
  color: #ddd; /* Slightly lighter color for the position */
`;

const AuthorImage = styled.div`
  width: 4rem; /* Reduced size */
  height: 4rem; /* Reduced size */
  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  border: 3px solid #fff;
`;

// Container for both groups (top-to-bottom and bottom-to-top)
const CardsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px; /* Adjust as necessary */
  overflow: hidden;
  margin: 0 auto;
  padding: 2rem;
  gap: 3px; /* Reduced gap between left and right card groups to 3px */
`;

// Section for Testimonials with top-to-bottom and bottom-to-top movement
const TestimonialsSection = () => {
  const testimonials = [
    {
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      name: "Jane Doe",
      position: "CEO, Example Corp",
      text: "This service is absolutely amazing! I highly recommend it to anyone looking for quality and reliability.",
    },
    {
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      name: "John Smith",
      position: "Marketing Director, XYZ Ltd.",
      text: "A game-changer for our business. The customer support is fantastic, and the results speak for themselves.",
    },
    {
      image: "https://randomuser.me/api/portraits/men/46.jpg",
      name: "Mike Taylor",
      position: "Software Engineer",
      text: "I was skeptical at first, but after using this product, I can’t imagine going back. It’s truly a must-have!",
    },
    {
      image: "https://randomuser.me/api/portraits/women/47.jpg",
      name: "Anna Lee",
      position: "Product Manager, ABC Tech",
      text: "The features and design are incredible. It has improved our workflow drastically.",
    },
    {
      image: "https://randomuser.me/api/portraits/men/48.jpg",
      name: "Mark Brown",
      position: "Designer",
      text: "The design is sleek and intuitive. A fantastic product all around!",
    },
    {
      image: "https://randomuser.me/api/portraits/women/49.jpg",
      name: "Sarah White",
      position: "Founder, StartUp Co.",
      text: "I can't imagine running our business without this. Truly invaluable!",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h2 className="text-4xl font-bold text-white mt-16 mb-12">What Our Clients Say</h2>
      <CardsContainer>
        {/* Left Group (Top to Bottom) */}
        <div className="flex flex-col gap-12">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              animation="top-to-bottom" // Even-index for top-to-bottom
            >
              <AuthorImage imgUrl={testimonial.image} />
              <TestimonialText>{testimonial.text}</TestimonialText>
              <AuthorName>{testimonial.name}</AuthorName>
              <AuthorPosition>{testimonial.position}</AuthorPosition>
            </TestimonialCard>
          ))}
        </div>

        {/* Right Group (Bottom to Top) */}
        <div className="flex flex-col gap-12">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              animation="bottom-to-top" // Odd-index for bottom-to-top
            >
              <AuthorImage imgUrl={testimonial.image} />
              <TestimonialText>{testimonial.text}</TestimonialText>
              <AuthorName>{testimonial.name}</AuthorName>
              <AuthorPosition>{testimonial.position}</AuthorPosition>
            </TestimonialCard>
          ))}
        </div>
      </CardsContainer>
    </div>
  );
};

export default TestimonialsSection;
