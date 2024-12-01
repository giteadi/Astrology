import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import TriangularCarousel from "../components/TriangularCarousal";

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

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 14rem;
    height: 14rem;
  }

  margin: 1rem;
`;

const ItemDetails = ({ item, onBuyNow }) => (
  <div className="text-center">
    <p className="text-sm">{item.description}</p>
    <p className="text-lg font-semibold text-yellow-400">{`$${item.price.toFixed(2)}`}</p>
    <button
      className="mt-2 bg-[#ff6347] hover:bg-[#ff4500] text-white font-medium py-2 px-4 rounded transition-colors duration-300"
      onClick={onBuyNow}
      aria-label={`Buy ${item.title}`}
    >
      Buy Now
    </button>
  </div>
);

const Astrology = () => {

  
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1c1c3d] to-[#4b0082] flex flex-col items-center justify-center text-white">
     <TriangularCarousel/>
    </div>
  );
};

export default Astrology;
