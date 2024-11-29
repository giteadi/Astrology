import React from "react";
import styled, { keyframes, css } from "styled-components";

// Keyframe for cards coming from top to bottom
const moveFromTop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-100%); /* Start from the top */
  }
  25% {
    opacity: 1;
    transform: translateY(0); /* Move to the normal position */
  }
  50% {
    opacity: 1;
    transform: translateY(0); /* Stay in position */
  }
  75% {
    opacity: 1;
    transform: translateY(0); /* Stay in position */
  }
  100% {
    opacity: 0;
    transform: translateY(100%); /* Move out to the bottom */
  }
`;

// Keyframe for cards coming from bottom to top
const moveFromBottom = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100%); /* Start from the bottom */
  }
  25% {
    opacity: 1;
    transform: translateY(0); /* Move to the normal position */
  }
  50% {
    opacity: 1;
    transform: translateY(0); /* Stay in position */
  }
  75% {
    opacity: 1;
    transform: translateY(0); /* Stay in position */
  }
  100% {
    opacity: 0;
    transform: translateY(-100%); /* Move out to the top */
  }
`;

// Custom Testimonial Card Styled Component with looping animation
const TestimonialCard = styled.div`
  width: 100%;
  background: rgba(255, 255, 255, 0.2); /* Add slight transparency */
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Light shadow for depth */
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem; /* Spacing between content */
  backdrop-filter: blur(10px); /* Subtle blur effect for background */
  text-align: center;
  opacity: 0;
  animation: ${({ animation }) =>
    animation === "top-to-bottom"
      ? css`
          ${moveFromTop} 6s ease-in-out infinite
        `
      : css`
          ${moveFromBottom} 6s ease-in-out infinite
        `};
`;

// Other Styled Components
const TestimonialText = styled.p`
  font-size: 1rem;
  color: #fff; /* Light text for visibility on dark background */
  line-height: 1.6;
  font-style: italic;
`;

const AuthorName = styled.h3`
  font-size: 1.25rem;
  color: #fff; /* White color for name */
  font-weight: 600;
`;

const AuthorPosition = styled.p`
  font-size: 1rem;
  color: #ddd; /* Slightly lighter color for the position */
`;

const AuthorImage = styled.div`
  width: 5rem;
  height: 5rem;
  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  border: 3px solid #fff;
`;

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
    <div className="flex flex-col items-center min-h-screen p-8">
      <h2 className="text-4xl font-bold text-white mt-16 mb-12">What Our Clients Say</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12 w-full max-w-screen-xl">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            animation={index % 2 === 0 ? "top-to-bottom" : "bottom-to-top"} // Even-index for top-to-bottom, odd-index for bottom-to-top
          >
            <AuthorImage imgUrl={testimonial.image} />
            <TestimonialText>{testimonial.text}</TestimonialText>
            <AuthorName>{testimonial.name}</AuthorName>
            <AuthorPosition>{testimonial.position}</AuthorPosition>
          </TestimonialCard>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
