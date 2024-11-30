import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/CartSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Styled Components
const DownwardTriangle = styled.div`
  width: 18rem;
  height: 18rem;
  background: rgba(255, 255, 255, 0.2); /* Semi-transparent for glass effect */
  clip-path: polygon(50% 100%, 0% 0%, 100% 0%);
  backdrop-filter: blur(10px); /* Frosted glass effect */
  display: flex;
  justify-content: center;
  align-items: flex-start;
  color: white;
  font-weight: bold;
  text-align: center;
  padding: 1.5rem;
  position: relative;
  border: 2px solid rgba(255, 255, 255, 0.3); /* Subtle border for depth */
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-10px); /* Lift effect on hover */
    box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    width: 14rem;
    height: 14rem;
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

const DescriptionContainer = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  color: white;
  font-size: 1rem;
  font-weight: normal;
  width: 18rem;

  @media (max-width: 768px) {
    width: 14rem;
  }
`;

const CarouselContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allow items to wrap on smaller screens */
  justify-content: center; /* Center items horizontally */
  gap: 2rem; /* Space between items */
  padding: 2rem;

  @media (max-width: 768px) {
    flex-direction: column; /* Stack items vertically for smaller screens */
    align-items: center; /* Center items */
    gap: 1.5rem;
  }
`;

const DownwardCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleBookNow = async (item) => {
    if (!user) {
      navigate("/login");
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
        navigate(`/numerology-page${item.id}`); // Navigate to dynamic numerology page
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("Failed to add item. Please try again.");
    }
  };

  const services = [
    { id: 201, title: "Palmistry", description: "Read your palm lines.", price: 299.99 },
    { id: 202, title: "Tarot", description: "Guidance through tarot cards.", price: 399.99 },
    { id: 203, title: "Crystal Healing", description: "Energy through crystals.", price: 499.99 },
  ];

  return (
    <CarouselContainer>
      {services.map((item) => (
        <div
          key={item.id}
          className="flex flex-col items-center cursor-pointer"
          onClick={() => navigate(`/product/${item.title}`)} // Navigate to dynamic page on click
        >
          <DownwardTriangle>
            <div>{item.title.toUpperCase()}</div>
          </DownwardTriangle>
          <DescriptionContainer>{item.description}</DescriptionContainer>
          <Button onClick={(e) => {
            e.stopPropagation(); // Prevent navigation when clicking on the button
            handleBookNow(item);
          }}>
            BOOK NOW
          </Button>
        </div>
      ))}
    </CarouselContainer>
  );
};

export default DownwardCarousel;
