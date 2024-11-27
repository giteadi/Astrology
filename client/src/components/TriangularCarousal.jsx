import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/CartSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Updated Styled Components
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
  position: relative;
  border: 2px solid #6a0dad; /* Add border for the gradient effect */
  background: linear-gradient(145deg, #6a0dad, #3a0078); /* Gradient applied */
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

const BackgroundWrapper = styled.div`
  height: 100vh; /* Full viewport height */
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent; /* Transparent background */
`;

const TriangleContainer = styled.div`
  display: flex;
  justify-content: space-around; /* Distributes triangles with space around */
  flex-wrap: wrap; /* Allows triangles to wrap on smaller screens */
  width: 100%;
  padding: 2rem; /* Add some padding around the container */
`;

const TriangularCarousel = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleBookNow = async (item) => {
    if (!user) {
      navigate("/login");
      return;
    }

    const price = String(item.price);
    const cartItem = {
      user_id: user.userId,
      item_id: item.id,
      title: item.title,
      description: item.description,
      price: price,
      quantity: 1,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/api/cart/add",
        cartItem
      );
      if (response.status === 200) {
        console.log("Item successfully added to the database!");
        dispatch(addToCart(cartItem));
      }
    } catch (error) {
      console.error("Failed to add item to the cart:", error);
      if (error.response) {
        alert(error.response.data.message || "Failed to add item to the cart");
      } else {
        alert("Network error, please try again later.");
      }
    }
  };

  const services = [
    { id: 102, title: "Numerology", description: "Insights into your life's path.", price: 299.99 },
    { id: 103, title: "Astrology", description: "Celestial alignments insights.", price: 399.99 },
    { id: 104, title: "Vastu", description: "Guidance through life's challenges.", price: 499.99 },
  ];

  return (
    <BackgroundWrapper>
      <TriangleContainer>
        {services.map((item) => (
          <div key={item.id} className="flex flex-col items-center cursor-pointer">
            <TriangleCard
              onClick={() => {
                navigate(`/astrology/${item.id}`);
              }}
            >
              <div>{item.title.toUpperCase()}</div>
            </TriangleCard>
            <DescriptionContainer>{item.description}</DescriptionContainer>
            <Button onClick={() => handleBookNow(item)}>BOOK NOW</Button>
          </div>
        ))}
      </TriangleContainer>
    </BackgroundWrapper>
  );
};

export default TriangularCarousel;
