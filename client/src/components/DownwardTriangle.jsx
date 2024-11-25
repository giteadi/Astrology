import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/CartSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const DownwardTriangle = styled.div`
  width: 18rem;
  height: 18rem;
  background: linear-gradient(145deg, #6a0dad, #3a0078);
  clip-path: polygon(50% 100%, 0% 0%, 100% 0%); /* Keep the downward triangle */
  display: flex;
  justify-content: center;
  align-items: flex-start;
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
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate for redirection
  const { user } = useSelector((state) => state.auth); // Get user data from Redux

  const handleBookNow = async (item) => {
    if (!user) {
      // If the user is not logged in, redirect to the login page
      navigate("/login"); // Change '/login' to the path of your login page
      return;
    }

    const cartItem = {
      user_id: user.userId,
      item_id: item.id,
      title: item.title,
      description: item.description,
      price: String(item.price),
      quantity: 1,
    };

    try {
      const response = await axios.post("http://localhost:4000/api/cart/add", cartItem);

      if (response.status === 200) {
        console.log("Item added to the cart successfully!");
        dispatch(addToCart(cartItem));
        // Navigate to Numerology page after successful addition to cart
        navigate("/numerology"); // Redirect to the Numerology service page
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("Failed to add item. Please try again.");
    }
  };

  // Service data
  const services = [
    { id: 102, title: "Numerology", description: "Insights into your life's path.", price: 299.99 },
    { id: 103, title: "Astrology", description: "Celestial alignments insights.", price: 399.99 },
    { id: 104, title: "Vastu", description: "Guidance through life's challenges.", price: 499.99 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center py-12">
      {services.map((item) => (
        <div key={item.id} className="flex flex-col items-center cursor-pointer">
          <DownwardTriangle>
            <div>{item.title.toUpperCase()}</div>
          </DownwardTriangle>
          <DescriptionContainer>{item.description}</DescriptionContainer>
          <Button onClick={() => handleBookNow(item)}>BOOK NOW</Button>
        </div>
      ))}
    </div>
  );
};

export default TriangularCarousel;
