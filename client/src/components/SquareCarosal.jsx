import React from "react";
import styled from "styled-components";

const CarouselWrapper = styled.div`
  text-align: center;
  padding: 2rem 0;
`;

const CarouselContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: auto;
  gap: 2rem;
`;

const SquareCard = styled.div`
  width: 120px;
  height: 120px;
  background: linear-gradient(145deg, #6a0dad, #3a0078);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  position: relative;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #4b0082;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-top: 20px; /* Space between carousel and button */
`;

const SquareCarousel = () => {
  return (
    <CarouselWrapper>
      <CarouselContainer>
        {[1, 2, 3, 4].map((item, index) => (
          <div key={index}>
            <SquareCard>SERVICE {item}</SquareCard>
          </div>
        ))}
      </CarouselContainer>
      <Button>BOOK NOW</Button> {/* The button is now outside the Carousel */}
    </CarouselWrapper>
  );
};

export default SquareCarousel;
