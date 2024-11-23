import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux"; // Access Redux store for user info
import { addToCart } from "../Redux/CartSlice"; // Import the addToCart action
import axios from "axios"; // Import Axios for API requests

// Styled components remain the same
const TriangleCard = styled.div`
  width: 18rem;
  height: 18rem;
  background: linear-gradient(145deg, #6a0dad, #3a0078);
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  display: flex;
  justify-content: center;
  align-items: flex-end;
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
  const dispatch = useDispatch(); // Access dispatch from Redux
  const { user } = useSelector((state) => state.auth); // Get user data from Redux store

  // Check if the user is authenticated (i.e., user exists)
  if (!user) {
    return <p>Please log in to add items to the cart.</p>; // Message if user is not logged in
  }

  const handleBookNow = async (item) => {
    // Ensure price is a string before calling .replace()
    const price = String(item.price); // Convert the price to a string
  
    const cartItem = {
      user_id: user.userId, // Get the userId from Redux store
      item_id: item.id, // Assuming item has an 'id' field
      title: item.title, // Add title to cart item
      description: item.description, // Add description to cart item
      price: price, // Ensure price is a string
      quantity: 1, // Default to 1 (you can adjust based on your needs)
    };
  
    // Dispatch an action to add the item to the cart (if you want to manage cart locally)
    dispatch(addToCart(cartItem));
  
    // Now send the item data to the backend via API
    try {
      const response = await axios.post('http://localhost:4000/api/cart/add', cartItem);
  
      // Optionally handle response data (e.g., show a success message)
      if (response.status === 200) {
        console.log("Item successfully added to the database!");
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

  // Sample service data, assuming each item has an 'id', 'title', 'price', and 'description'
  const services = [
    { id: 102, title: "Numerology", description: "Insights into your life's path.", price: 299.99 },
    { id: 103, title: "Astrology", description: "Celestial alignments insights.", price: 399.99 },
    { id: 104, title: "Vastu", description: "Guidance through life's challenges.", price: 499.99 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center py-12">
      {services.map((item) => (
        <div key={item.id} className="flex flex-col items-center">
          <TriangleCard>
            <div>{item.title.toUpperCase()}</div>
          </TriangleCard>
          <DescriptionContainer>{item.description}</DescriptionContainer>
          <Button onClick={() => handleBookNow(item)}>BOOK NOW</Button>
        </div>
      ))}
    </div>
  );
};

export default TriangularCarousel;
