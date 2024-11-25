import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux"; // Redux for user info
import { useNavigate } from "react-router-dom"; // Navigation
import axios from "axios"; // For API requests
import { addToCart } from "../Redux/CartSlice"; // Add to Cart action
import TriangularCarousel from "../components/TriangularCarousal";
// Styled components for consistent design
const Container = styled.div`
  padding: 2rem;
  background: linear-gradient(180deg, #3a0078, #1e003e);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 1rem;
  text-align: center;
`;

const Description = styled.p`
  font-size: 1.2rem;
  max-width: 700px;
  text-align: center;
  line-height: 1.8;
  margin-bottom: 2rem;
`;

const ServiceCard = styled.div`
  width: 300px;
  padding: 1.5rem;
  background: linear-gradient(145deg, #6a0dad, #3a0078);
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  margin-bottom: 2rem;
`;

const Button = styled.button`
  padding: 0.8rem 2rem;
  background-color: #6a0dad;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background-color: #5a0071;
    transform: scale(1.05);
  }
`;

const AstrologyPage = () => {
  const dispatch = useDispatch(); // Redux dispatch
  const { user } = useSelector((state) => state.auth); // Get user info
  const navigate = useNavigate(); // React Router navigation

  // Handle booking logic
  const handleBookNow = async () => {
    if (!user) {
      // If the user is not logged in, redirect to login
      navigate("/login");
      return;
    }

    const cartItem = {
      user_id: user.userId,
      item_id: 103, // Hardcoded ID for Astrology service
      title: "Astrology Service",
      description: "Get insights into celestial alignments.",
      price: 399.99,
      quantity: 1,
    };

    try {
      const response = await axios.post("http://localhost:4000/api/cart/add", cartItem);
      if (response.status === 200) {
        console.log("Item added to cart successfully!");
        dispatch(addToCart(cartItem)); // Add to Redux cart
        alert("Service booked successfully!");
      }
    } catch (error) {
      console.error("Error booking service:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <Container>
      <Title>Astrology Service</Title>
      <Description>
        Dive into the mysteries of the cosmos and uncover insights about your life's path, relationships, and destiny.
        Our astrology services provide a deep understanding of celestial alignments and their impact on your life.
      </Description>
      <ServiceCard>
        <h2>Astrology Consultation</h2>
        <p>Price: $399.99</p>
        <Button onClick={handleBookNow}>Book Now</Button>
      </ServiceCard>
    </Container>
  );
};

export default AstrologyPage;
