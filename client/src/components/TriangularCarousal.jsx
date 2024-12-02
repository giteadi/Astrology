import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios

const TriangleCard = styled.div`
  width: 18rem;
  height: 18rem;
  background: transparent;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  color: white;
  font-weight: bold;
  text-align: center;
  padding: 1.5rem;
  border: 2px solid #6a0dad;
  background: linear-gradient(145deg, #6a0dad, #3a0078);
  position: relative;
  cursor: pointer;
  transition: transform 0.3s;
  margin: 3rem; /* Add horizontal margin between cards */

  &:hover {
    transform: scale(1.05);
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
  gap: 0; /* Reset gap to avoid double spacing */
`;

const TriangularCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();
  const groupSize = 3;

  // Fetch data from API
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/cart/getService")
      .then((response) => {
        // Filter services with IDs between 6 and 14
        const filteredServices = response.data.filter(
          (service) => service.id >= 6 && service.id <= 14
        );
        setServices(filteredServices); // Store services in state
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

  // Group the services into chunks of `groupSize`
  const groupedServices = [];
  for (let i = 0; i < services.length; i += groupSize) {
    groupedServices.push(services.slice(i, i + groupSize));
  }

  const handleCardClick = (serviceName) => {
    navigate(`/product/${serviceName}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 1 >= Math.ceil(services.length / groupSize) ? 0 : prevIndex + 1
      );
    }, 5000); // 5 seconds for each slide

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [services]);

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  return (
    <Wrapper>
      <SliderContainer
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {groupedServices.map((group, groupIndex) => (
          <Slide key={groupIndex}>
            {group.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center cursor-pointer"
              >
                <TriangleCard onClick={() => handleCardClick(item.id)}>
                  <div>{item.title.toUpperCase()}</div>
                </TriangleCard>
                <DescriptionContainer>{item.description}</DescriptionContainer>
                <Button onClick={() => handleCardClick(item.id)}>
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

export default TriangularCarousel;
