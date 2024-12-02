import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios

// Styled Component for Triangle Card
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
  margin: 1rem;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 1200px) {
    width: 16rem;
    height: 16rem;
  }

  @media (max-width: 1024px) {
    width: 15rem;
    height: 15rem;
  }

  @media (max-width: 768px) {
    width: 14rem;
    height: 14rem;
  }

  @media (max-width: 480px) {
    width: 12rem;
    height: 12rem;
  }
`;

// Description Container
const DescriptionContainer = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  color: white;
  font-size: 1rem;
  font-weight: normal;
  width: 18rem;

  @media (max-width: 1200px) {
    width: 16rem;
  }

  @media (max-width: 1024px) {
    width: 15rem;
  }

  @media (max-width: 768px) {
    width: 14rem;
  }

  @media (max-width: 480px) {
    width: 12rem;
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

// Wrapper and Layout for Grouping Cards
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); // Display 4 cards horizontally on larger screens (laptop)
  gap: 1rem; // Space between the cards
  margin: 2rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr); // Use 3 columns for screens smaller than 1200px
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr); // 2 columns for tablet screens
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); // 2 columns for medium-sized mobile screens
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr; // Single column on very small devices
  }
`;


// Component for the page
const TriangleCardPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

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

  // Handle Card Click
  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1c1c3d] to-[#4b0082] flex items-center justify-center text-white">
      <Wrapper>
        {services.map((item, index) => (
          <div key={index} className="flex flex-col items-center cursor-pointer">
            <TriangleCard onClick={() => handleCardClick(item.id)}>
              <div>{item.title.toUpperCase()}</div>
            </TriangleCard>
            <DescriptionContainer>{item.description}</DescriptionContainer>
            <Button onClick={() => handleCardClick(item.id)}>BOOK NOW</Button>
          </div>
        ))}
      </Wrapper>
    </div>
  );
};

export default TriangleCardPage;
