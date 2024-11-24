import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/CartSlice"; // Redux action
import axios from "axios"; // API requests
import { useNavigate } from "react-router-dom"; // For navigation

// Styled Square Component
const Square = styled.div`
  width: 18rem;
  height: 18rem;
  background: linear-gradient(145deg, #6a0dad, #3a0078); /* Gradient for the square */
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  text-align: center;
  font-size: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative; /* To position the content correctly */
  transition: transform 0.3s ease-in-out; /* Smooth transition effect */
  
  /* Add surfing effect when hovering */
  &:hover {
    transform: scale(1.05); /* Slightly grow the square on hover */
  }
`;

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
  width: 18rem;
`;

const SquareCarousel = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // Get user from Redux store
  const navigate = useNavigate(); // For navigation
  const [isLoggedIn, setIsLoggedIn] = useState(user !== null); // State to check if the user is logged in

  const handleBookNow = async (item) => {
    if (!isLoggedIn) {
      navigate("/login"); // Redirect to the login page if user is not logged in
      return; // Prevent further code execution
    }

    const cartItem = {
      user_id: user.userId, // Fetch user ID from Redux
      item_id: item.id, // Service ID
      title: item.title, // Service title
      description: item.description, // Service description
      price: String(item.price), // Ensure price is a string
      quantity: 1, // Default quantity
    };

    try {
      const response = await axios.post("http://localhost:4000/api/cart/add", cartItem);

      if (response.status === 200) {
        console.log("Item added to the cart successfully!");
        dispatch(addToCart(cartItem)); // Update Redux store
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("Failed to add item. Please try again.");
    }
  };

  const services = [
    { id: 1, title: "Fitness", description: "Stay fit with personalized plans.", price: 199.99 },
    { id: 2, title: "Meditation", description: "Achieve peace with guided sessions.", price: 149.99 },
    { id: 3, title: "Yoga", description: "Boost flexibility and strength.", price: 249.99 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center py-12">
      {services.map((item) => (
        <div key={item.id} className="flex flex-col items-center text-white">
          <Square>{item.title.toUpperCase()}</Square>
          <DescriptionContainer>{item.description}</DescriptionContainer>
          <Button onClick={() => handleBookNow(item)}>
            {isLoggedIn ? "BOOK NOW" : "LOGIN TO BOOK"} {/* Change text based on login status */}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default SquareCarousel;
