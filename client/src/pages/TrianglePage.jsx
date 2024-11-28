import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux"; // Redux for user info
import { useNavigate } from "react-router-dom"; // Navigation
import axios from "axios"; // For API requests
import { addToCart } from "../Redux/CartSlice"; // Add to Cart action

// Styled components for consistent design
const Container = styled.div`
  padding: 2rem;
  background: linear-gradient(180deg, #3a0078, #1e003e);
  min-height: 100vh;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 5rem;  /* Increased margin-bottom to add more space at the bottom */
  text-align: center;
  color: #fff;

  /* Adjust for mobile screens */
  @media (max-width: 768px) {
    font-size: 1.8rem;  /* Smaller font size for mobile */
    margin-bottom: 3rem; /* Increased margin for mobile */
  }

  /* For larger screens like laptops */
  @media (min-width: 1024px) {
    margin-bottom: 6rem;  /* Further increased bottom margin for large screens */
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 450px; /* Increased width */
  margin: 0 auto;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  padding: 1rem;

  /* Ensure the card doesn't stretch too much */
  width: 100%;

  @media (max-width: 768px) {
    max-width: 350px; /* Adjust max-width for mobile */
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
`;

const TriangleCard = styled.div`
  width: 0;
  height: 0;
  border-left: 150px solid transparent;
  border-right: 150px solid transparent;
  border-bottom: 250px solid #6a0dad;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end; /* Ensures title is aligned at the bottom */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.5);
  }

  h2 {
    position: absolute;
    bottom: 10px; /* Adjusted to place title at the bottom */
    color: white;
    font-size: 1.5rem; /* Slightly larger text */
    text-align: center;

    /* Adjust for mobile screens */
    @media (max-width: 768px) {
      font-size: 1.2rem;
      bottom: 5px; /* Slightly adjusted bottom spacing for mobile */
    }
  }
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ff6347; /* Adjusted to a more vibrant color */
  margin-top: 1rem;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: #333;
  margin: 1rem 0;
  line-height: 1.6;

  /* Adjust font size for smaller screens */
  @media (max-width: 768px) {
    font-size: 1rem;  /* Smaller font size for mobile */
  }
`;

const Button = styled.button`
  padding: 0.8rem 2rem;
  background-color: #6a0dad;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  margin-top: 1rem;

  /* Adjust button for mobile */
  @media (max-width: 768px) {
    font-size: 1rem;  /* Smaller font size for mobile */
    padding: 0.6rem 1.5rem;  /* Adjust padding for mobile */
  }

  &:hover {
    background-color: #5a0071;
    transform: scale(1.05);
  }
`;

const AstrologyConsultation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f4f4f4;
  border-radius: 10px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

const AstrologyTitle = styled.h2`
  color: #6a0dad;
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const AstrologyDescription = styled.p`
  font-size: 1.1rem;
  color: #333;
  line-height: 1.6;
`;

const AstrologyPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleBookNow = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const cartItem = {
      user_id: user.userId,
      item_id: 103,
      title: "Astrology Service",
      description: "Get insights into celestial alignments.",
      price: 399.99,
      quantity: 1,
    };

    try {
      const response = await axios.post("http://localhost:4000/api/cart/add", cartItem);
      if (response.status === 200) {
        console.log("Item added to cart successfully!");
        dispatch(addToCart(cartItem));
        alert("Service booked successfully!");
      }
    } catch (error) {
      console.error("Error booking service:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const service = { title: "Astrology Consultation", description: "Explore the mysteries of the cosmos with personalized astrology readings.", price: 399.99 };

  return (
    <Container>
      <Title>Astrology Services</Title>
      <Card>
        <TriangleCard>
         
        </TriangleCard>
        <Price>${service.price}</Price>
        <Description>
          {service.description}
        </Description>
        <Button onClick={handleBookNow}>Book Now</Button>
      </Card>

      {/* Astrology Consultation Section */}
      <AstrologyConsultation>
        <AstrologyTitle>Astrology Consultation</AstrologyTitle>
        <AstrologyDescription>
          Explore the mysteries of the cosmos with personalized astrology readings. 
          Discover insights about your life path, relationships, and future.
        </AstrologyDescription>
      </AstrologyConsultation>
    </Container>
  );
};

export default AstrologyPage;
