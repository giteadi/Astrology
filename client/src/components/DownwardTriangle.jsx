import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/CartSlice"; // Correct import for addToCart action

// Downward Triangle Box styled component (pointing downwards)
const DownwardTriangle = styled.div`
  width: 18rem; /* 72 units */
  height: 18rem; /* 72 units */
  background: linear-gradient(145deg, #6a0dad, #3a0078);
  clip-path: polygon(50% 100%, 0% 0%, 100% 0%); /* Inverted triangle */
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Align items at the top of the triangle */
  color: white;
  font-weight: bold;
  text-align: center;
  padding: 1.5rem;
  position: relative;
`;

// Styled button without bubble animation
const Button = styled.button`
  padding: 1rem 2rem;
  background-color: #6a0dad;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 9999px; /* Fully rounded */
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
  width: 18rem; /* Ensure it aligns with the card width */
`;

const TriangularCarousel = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const dispatch = useDispatch(); // Access dispatch from Redux

  // Handle Book Now button click
  const handleBookNow = (service) => {
    // Dispatch action to add service to cart
    dispatch(addToCart({
      name: `Service ${service}`,
      description: `Description for Service ${service}`,
      price: "₹2,000",  // Example price
      quantity: 1,
      imageUrl: "https://via.placeholder.com/150",  // Example image URL
    }));

    // Optionally, navigate to a different page
    navigate("/cart"); // Redirect to the cart page
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center py-12">
      {[1, 2, 3].map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <DownwardTriangle>
            <div>SERVICE {item}</div>
          </DownwardTriangle>
          <DescriptionContainer>
            {item === 1
              ? "Numerology can provide insights into your life's path."
              : item === 2
              ? "Astrology reveals the alignment of celestial bodies."
              : "Tarot reading guides you through life's challenges."}
          </DescriptionContainer>
          <Button onClick={() => handleBookNow(item)}>BOOK NOW</Button>
        </div>
      ))}
    </div>
  );
};

export default TriangularCarousel;
