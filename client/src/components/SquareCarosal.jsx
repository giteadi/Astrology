import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import vastuServices from "../components/vastuArray"; // Ensure this is populated

// Styled components
const Square = styled.div`
  width: 18rem;
  height: 18rem;
  background: linear-gradient(145deg, #6a0dad, #3a0078);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  text-align: center;
  font-size: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  margin: 2rem; /* Add margin between squares */

  &:hover {
    transform: scale(1.05);
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background-color: #6a0dad;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 20px;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #5a0071;
    transform: scale(1.1);
  }
`;

const DescriptionContainer = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  color: white;
  font-size: 1rem;
  font-weight: normal;
  width: 18rem;
`;

const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;

const SliderContainer = styled.div`
  display: flex;
  transition: transform 1s ease-in-out;
`;

const Slide = styled.div`
  display: flex;
  gap: 2rem; /* Ensure there's space between items */
  justify-content: center;
  flex: 1;
`;

const SquareCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const groupSize = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 1 >= Math.ceil(vastuServices.length / groupSize) ? 0 : prevIndex + 1
      );
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  const groupedServices = [];
  for (let i = 0; i < vastuServices.length; i += groupSize) {
    groupedServices.push(vastuServices.slice(i, i + groupSize));
  }

  const handleCardClick = (serviceName) => {
    navigate(`/service/${serviceName}`);
  };

  return (
    <Wrapper>
      <SliderContainer style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {groupedServices.map((group, groupIndex) => (
          <Slide key={groupIndex}>
            {group.map((item, index) => (
              <div key={index} className="flex flex-col items-center cursor-pointer">
                {/* Safeguard: Check if serviceName exists before using toUpperCase */}
                <Square onClick={() => handleCardClick(item?.serviceName)}>
                  {item?.serviceName ? item.serviceName.toUpperCase() : "No Service Name"}
                </Square>
                <DescriptionContainer>{item?.description}</DescriptionContainer>
                <Button onClick={() => console.log("Book Now Clicked")}>
                  BOOK NOW
                </Button>
              </div>
            ))}
          </Slide>
        ))}
      </SliderContainer>
    </Wrapper>
  );
};

export default SquareCarousel;
