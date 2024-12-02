import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Container with background gradient and stars
const Container = styled.div`
  padding: 2rem;
  background: radial-gradient(circle, #3a0078, #1e003e 80%);
  min-height: 100vh;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  /* Animated cosmic stars background */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('/path/to/stars.png') repeat; /* Add a starry background */
    opacity: 0.1;
    z-index: 0;
  }
`;

// Square card styling
const Square = styled.div`
  width: 100%;
  max-width: 250px;  // Add max width to prevent the cards from stretching too wide
  height: 250px;
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
  margin: 1rem;

  &:hover {
    transform: scale(1.05);
  }
`;

// Button styling
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

// Description container styling
const DescriptionContainer = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  color: white;
  font-size: 1rem;
  font-weight: normal;
  width: 100%;
`;

// Main wrapper for the grid
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 2rem;
  width: 100%;
  z-index: 1;
  padding: 2rem 0;
`;

const VastuPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/cart/getService") // Adjust the API URL if needed
      .then((response) => {
        const filteredServices = response.data.filter(
          (service) => service.id >= 15 && service.id <= 19 // Fetch services with ID range 15-19
        );
        setServices(filteredServices);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setLoading(false);
      });
  }, []);

  const handleCardClick = (serviceId) => {
    navigate(`/product/${serviceId}`); // Navigate to the product page using the service ID
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Wrapper>
        {services.map((item) => (
          <div key={item.id} className="flex flex-col items-center cursor-pointer">
            <Square onClick={() => handleCardClick(item?.id)}>
              {item?.title ? item.title.toUpperCase() : "No Service Name"}
            </Square>
            <DescriptionContainer>{item?.description}</DescriptionContainer>
            <Button onClick={() => handleCardClick(item?.id)}>BOOK NOW</Button>
          </div>
        ))}
      </Wrapper>
    </Container>
  );
};

export default VastuPage;
