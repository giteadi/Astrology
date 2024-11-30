import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
  // Dummy data array
  const astrologyItems = [
    { id: 102, title: "Astrology", description: "Insights into your life's path.", price: 299.99 },
    { id: 103, title: "Vastu", description: "Celestial alignments insights.", price: 399.99 },
    { id: 104, title: "Numerology", description: "Guidance through life's challenges.", price: 499.99 },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleBuyNow = (title) => {
    setIsLoading(true);
    setTimeout(() => {
      navigate(`/product/${title}`);
      setIsLoading(false);
    }, 500); // Simulate a loading delay
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1c1c3d] to-[#4b0082] flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-4">Astrology</h1>
      <p className="text-lg mb-8 text-center max-w-2xl">
        Discover the ancient science of astrology and how celestial bodies influence human lives.
      </p>
      <div className="flex flex-wrap justify-center gap-8">
        {astrologyItems.map((item, index) => (
          <div key={item.id} className="flex flex-col items-center gap-4">
            {/* Triangle Card */}
            <TriangleCard
              onClick={() => handleBuyNow(item.title)}
              aria-label={`Go to ${item.title} details`}
            >
              <div>{item.title.toUpperCase()}</div>
            </TriangleCard>
            {/* Card Details */}
            <ItemDetails item={item} onBuyNow={() => handleBuyNow(item.title)} />
          </div>
        ))}
      </div>
      {isLoading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default Astrology;
