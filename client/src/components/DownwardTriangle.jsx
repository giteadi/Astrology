import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// Styled Components for Downward Triangle Carousel
const DownwardTriangle = styled.div`
  width: 18rem;
  height: 18rem;
  background: rgba(255, 255, 255, 0.2); /* Semi-transparent for glass effect */
  clip-path: polygon(50% 100%, 0% 0%, 100% 0%);
  backdrop-filter: blur(10px); /* Frosted glass effect */
  display: flex;
  justify-content: center;
  align-items: flex-start;
  color: white;
  font-weight: bold;
  text-align: center;
  padding: 1.5rem;
  position: relative;
  border: 2px solid rgba(255, 255, 255, 0.3); /* Subtle border for depth */
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;
  margin: 2rem;
  &:hover {
    transform: translateY(-10px); /* Lift effect on hover */
    box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    width: 14rem;
    height: 14rem;
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

  @media (max-width: 768px) {
    width: 14rem;
  }
`;

const CarouselContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allow items to wrap on smaller screens */
  justify-content: center; /* Center items horizontally */
  gap: 2rem; /* Space between items */
  padding: 2rem;

  @media (max-width: 768px) {
    flex-direction: column; /* Stack items vertically for smaller screens */
    align-items: center; /* Center items */
    gap: 1.5rem;
  }
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
  justify-content: center; /* Ensure cards are centered */
  gap: 2rem; /* Space between cards */
`;

const DownwardCarousel = () => {
  const navigate = useNavigate();
  const groupSize = 3; // Number of items per slide

  const services = [
    { id: 201, title: "Palmistry", description: "Read your palm lines.", price: 299.99 },
    { id: 202, title: "Tarot", description: "Guidance through tarot cards.", price: 399.99 },
    { id: 203, title: "Crystal Healing", description: "Energy through crystals.", price: 499.99 },
    { id: 204, title: "Astrology", description: "Find your life's path.", price: 199.99 },
    { id: 205, title: "Numerology", description: "Unlock your future through numbers.", price: 249.99 },
    { id: 206, title: "Reiki Healing", description: "Heal your body with energy.", price: 349.99 },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 1 >= Math.ceil(services.length / groupSize) ? 0 : prevIndex + 1
      );
    }, 5000); // 5 seconds for each slide

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const groupedServices = [];
  for (let i = 0; i < services.length; i += groupSize) {
    groupedServices.push(services.slice(i, i + groupSize));
  }

  const handleBookNow = (item) => {
    navigate(`/service/${item.id}`);
  };

  return (
    <Wrapper>
      <SliderContainer style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {groupedServices.map((group, groupIndex) => (
          <Slide key={groupIndex}>
            {group.map((item) => (
              <div key={item.id} className="flex flex-col items-center cursor-pointer">
                <DownwardTriangle onClick={() => navigate(`/service/${item.id}`)}>
                  <div>{item.title.toUpperCase()}</div>
                </DownwardTriangle>
                <DescriptionContainer>{item.description}</DescriptionContainer>
                <Button onClick={(e) => {
                  e.stopPropagation(); // Prevent navigation when clicking on the button
                  handleBookNow(item);
                }}>
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

export default DownwardCarousel;
