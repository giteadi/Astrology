import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API calls

// Styled components for the square card
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

// Styled button for 'BOOK NOW'
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

// Styled component for the description
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
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for API
  const navigate = useNavigate();
  const groupSize = 3;

  // Fetch services from the API
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/cart/getService")
      .then((response) => {
        // Filter services with IDs between 15 and 19
        const filteredServices = response.data.filter(
          (service) => service.id >= 15 && service.id <= 19
        );
        setServices(filteredServices); // Store filtered services in state
        setLoading(false); // Set loading to false once the data is fetched
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setLoading(false); // Set loading to false if there's an error
      });
  }, []);

  // Group services into chunks of 'groupSize'
  const groupedServices = [];
  for (let i = 0; i < services.length; i += groupSize) {
    groupedServices.push(services.slice(i, i + groupSize));
  }

  // Function to handle card click and navigate to the service details page
  const handleCardClick = (serviceName) => {
    navigate(`/product/${serviceName}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 1 >= Math.ceil(services.length / groupSize) ? 0 : prevIndex + 1
      );
    }, 5000); // Slide every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [services]);

  if (loading) {
    return <div>Loading...</div>; // Show loading message until data is fetched
  }

  return (
    <Wrapper>
      <SliderContainer style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {groupedServices.map((group, groupIndex) => (
          <Slide key={groupIndex}>
            {group.map((item, index) => (
              <div key={index} className="flex flex-col items-center cursor-pointer">
                {/* Render the square card */}
                <Square onClick={() => handleCardClick(item?.title)}>
                  {item?.title ? item.title.toUpperCase() : "No Service Name"}
                </Square>
                <DescriptionContainer>{item?.description}</DescriptionContainer>
                <Button onClick={() => handleCardClick(item?.title)}>
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
