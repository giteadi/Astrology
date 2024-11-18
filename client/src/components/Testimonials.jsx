import React from "react";
import styled from "styled-components";

// Custom Testimonial Card Styled Component
const TestimonialCard = styled.div`
  width: 100%;
  background: #ffffff;
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
  
  /* Responsive Design */
  @media (max-width: 640px) {
    padding: 1.5rem;
    gap: 1rem;
  }
`;

const TestimonialText = styled.p`
  font-size: 1rem;
  color: #333;
  line-height: 1.6;
  font-style: italic;
`;

const AuthorName = styled.h3`
  font-size: 1.25rem;
  color: #6a0dad;
  font-weight: 600;
`;

const AuthorPosition = styled.p`
  font-size: 1rem;
  color: #888;
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

const Testimonial = ({ image, name, position, text }) => {
  return (
    <TestimonialCard>
      <AuthorImage imgUrl={image} />
      <TestimonialText>{text}</TestimonialText>
      <AuthorName>{name}</AuthorName>
      <AuthorPosition>{position}</AuthorPosition>
    </TestimonialCard>
  );
};

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
  ];

  return (
    <div className="flex flex-col items-center min-h-screen p-8">
      <h2 className="text-4xl font-bold text-white mt-16 mb-12">What Our Clients Say</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 w-full max-w-screen-xl">
        {testimonials.map((testimonial, index) => (
          <Testimonial
            key={index}
            image={testimonial.image}
            name={testimonial.name}
            position={testimonial.position}
            text={testimonial.text}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
