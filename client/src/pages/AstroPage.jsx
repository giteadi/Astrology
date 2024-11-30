import React from "react";
import styled from "styled-components";

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

  /* Add margin for spacing */
  margin: 1rem;
`;

const Astrology = () => {
  // Dummy data array
  const astrologyItems = [
    {
      title: "Zodiac Analysis",
      description: "Understand your zodiac sign and its traits.",
      price: "$19.99",
    },
    {
      title: "Astrology Report",
      description: "Detailed personal astrology report.",
      price: "$29.99",
    },
    {
      title: "Future Predictions",
      description: "Insights into your future based on planetary positions.",
      price: "$39.99",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1c1c3d] to-[#4b0082] flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-4">Astrology</h1>
      <p className="text-lg mb-8 text-center max-w-2xl">
        Discover the ancient science of astrology and how celestial bodies influence human lives.
      </p>
      <div className="flex flex-wrap justify-center gap-8">
        {astrologyItems.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-4">
            {/* Triangle Card */}
            <TriangleCard>
              <div className="absolute bottom-4 text-center">
                <h2 className="text-xl font-bold">{item.title}</h2>
              </div>
            </TriangleCard>
            {/* Card Details */}
            <div className="text-center">
              <p className="text-sm">{item.description}</p>
              <p className="text-lg font-semibold text-yellow-400">{item.price}</p>
              <button className="mt-2 bg-[#ff6347] hover:bg-[#ff4500] text-white font-medium py-2 px-4 rounded transition-colors duration-300">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Astrology;
