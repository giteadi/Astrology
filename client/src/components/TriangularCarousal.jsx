import React from "react";
import styled from "styled-components";

const CarouselContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: auto;
  padding: 2rem 0;
  gap: 2rem;
`;

const TriangleCard = styled.div`
  width: 200px; /* Increased size */
  height: 200px; /* Increased size */
  background: linear-gradient(145deg, #6a0dad, #3a0078);
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  color: white;
  font-weight: bold;
  position: relative;
  padding: 1rem;
  text-align: center;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #6a0dad; /* Button color to match the theme */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-top: 20px; /* Spacing between description and button */
  display: block;
  margin-left: auto;
  margin-right: auto; /* Centers the button */
`;

const DescriptionContainer = styled.div`
  margin-top: 10px;
  text-align: center;
  color: white; /* White description text */
  font-size: 1rem;
  font-weight: normal;
  width: 200px;
`;

const TriangularCarousel = () => {
  return (
    <CarouselContainer>
      {[1, 2, 3].map((item, index) => (
        <div key={index}>
          <TriangleCard>
            <div>SERVICE {item}</div>
          </TriangleCard>
          <DescriptionContainer>
            {item === 1
              ? "Numerology can provide insights into your life's path."
              : item === 2
              ? "Astrology reveals the alignment of celestial bodies."
              : "Tarot reading guides you through life's challenges."}
          </DescriptionContainer>
          <Button>BOOK NOW</Button>
        </div>
      ))}
    </CarouselContainer>
  );
};

export default TriangularCarousel;
