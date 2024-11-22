import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// Styled components remain the same
const TriangleCard = styled.div`
  width: 18rem;
  height: 18rem;
  background: linear-gradient(145deg, #6a0dad, #3a0078);
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  color: white;
  font-weight: bold;
  text-align: center;
  padding: 1.5rem;
  position: relative;
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

const TriangularCarousel = () => {
  const navigate = useNavigate();

  const handleBookNow = (item) => {
    const newOrder = {
      orderNo: `#${Math.floor(10000 + Math.random() * 90000)}`, 
      date: new Date().toLocaleDateString(),
      payment: "Pending",
      fulfillment: "Processing",
      total: "₹1000", // Example price
      items: [
        {
          name: item.title,
          description: item.description,
          price: "₹1000",
          quantity: 1,
        },
      ],
    };

    // Navigate to Dashboard with newOrder
    navigate("/dashboard", { state: { newOrder } });
  };

  const services = [
    { title: "Numerology", description: "Insights into your life's path." },
    { title: "Astrology", description: "Celestial alignments insights." },
    { title: "Vastu", description: "Guidance through life's challenges." },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center py-12">
      {services.map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <TriangleCard>
            <div>{item.title.toUpperCase()}</div>
          </TriangleCard>
          <DescriptionContainer>{item.description}</DescriptionContainer>
          <Button onClick={() => handleBookNow(item)}>BOOK NOW</Button>
        </div>
      ))}
    </div>
  );
};

export default TriangularCarousel;
