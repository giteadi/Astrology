import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addToCart,updateCartItem } from "../Redux/CartSlice"; // Redux action
import axios from "axios"; // API requests
import { useNavigate, useParams } from "react-router-dom"; // For navigation

// Import centralized array of services
import servicesArray from '../components/astrologyArray'; // Centralized array with all services

// Styled-components for custom styling
const FAQsSection = styled.section`
  margin-top: 4rem;
  .faq-item {
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    border-radius: 15px;
    margin-bottom: 1.5rem;
    backdrop-filter: blur(8px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-5px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    }
  }
  .faq-answer {
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem 1.5rem;
    margin-top: 1rem;
    border-radius: 8px;
    opacity: 0;
    transition: opacity 0.4s ease, transform 0.3s ease;
    transform: translateY(-10px);
    backdrop-filter: blur(8px);
  }
  .show-answer {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CartNotification = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #f44336;
  color: white;
  border-radius: 50%;
  padding: 5px 10px;
  font-size: 1rem;
  font-weight: bold;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const ProductPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const { serviceName } = useParams();  // The service name passed in the URL

  const [openFAQ, setOpenFAQ] = useState(null);

  const isLoggedIn = user !== null;

  // Dynamically select the correct service from the centralized array based on the 'serviceName' param
  const service = servicesArray.find(service => service.serviceName.toLowerCase() === serviceName.toLowerCase());

  if (!service) {
    return <div>Service not found</div>;
  }

  const handleFAQClick = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleBuyNow = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const orderData = {
      amount: service.price * 100,
      currency: "INR",
      receipt: `receipt#${Math.floor(Math.random() * 1000)}`,
    };

    try {
      const response = await axios.post("http://localhost:4000/api/cart/add", orderData);
      if (response.status === 200) {
        dispatch(addToCart(orderData));
        alert("Item added to the cart successfully!");
      }
    } catch (error) {
      console.error("Failed to add item to the cart:", error);
      if (error.response) {
        console.error("Response Error:", error.response.data);
        alert(error.response.data.message || "Failed to add item to the cart");
      } else {
        alert("Network error, please try again later.");
      }
    }
  };

  const handleBookNow = async (item) => {
    if (!user) {
      navigate("/login");
      return;
    }
  
    const userId = user.userId;
    console.log("userId:", userId);
  
    if (!userId) {
      alert("User ID is missing. Please log in first.");
      return;
    }
  
    console.log("item:", item); // Check the item data
  
    // Ensure item_id is present
    if (!item || !item.item_id) {
      alert("Item ID is missing. Please check the product data.");
      return;
    }
  
    const cartItem = {
      user_id: userId,                  // Correctly map the user_id
      item_id: item.item_id,            // Use item_id from the product
      title: item.serviceName,          // Title of the service/product
      description: item.description,    // Description of the service/product
      price: item.pricing,              // Price of the service/product
      quantity: 1                       // Set default quantity to 1
    };
  
    console.log("cartItem:", cartItem);  // Check if all fields are populated correctly
  
    try {
      const response = await axios.post("http://localhost:4000/api/cart/add", cartItem);
      if (response.status === 201) {
        console.log("Item successfully added to the cart!");
        dispatch(addToCart(cartItem)); // Add the item to Redux state
        alert("Item added to the cart successfully!");
      }
    } catch (error) {
      console.error("Failed to add item to the cart:", error);
      if (error.response) {
        alert(error.response.data.error || "Failed to add item to the cart");
      } else {
        alert("Network error, please try again later.");
      }
    }
  };
  
  
// Function to generate random item ID
function generateRandomItemId() {
    const randomPart = Math.random().toString(36).substr(2, 9); // generates a random alphanumeric string
    const timestamp = Date.now(); // timestamp to ensure uniqueness
    return `${randomPart}-${timestamp}`;  // Combine random part and timestamp
}


// Function to generate random item ID
function generateRandomItemId() {
    const randomPart = Math.random().toString(36).substr(2, 9); // generates a random alphanumeric string
    const timestamp = Date.now(); // timestamp to ensure uniqueness
    return `${randomPart}-${timestamp}`;  // Combine random part and timestamp
}

  
  const totalCartItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-t from-purple-800 to-indigo-900 text-white p-8">
      <div className="flex justify-end items-center mb-8">
        <button
          className="bg-opacity-20 hover:bg-opacity-40 text-white py-2 px-6 rounded-lg transition duration-300"
          onClick={() => navigate("/")}
        >
          Home
        </button>
        <div className="relative ml-4">
          <button
            className="bg-opacity-20 hover:bg-opacity-40 text-white py-2 px-6 rounded-lg transition duration-300"
            onClick={() => navigate("/cart")}
          >
            Cart
          </button>
          {totalCartItems > 0 && <CartNotification>{totalCartItems}</CartNotification>}
        </div>
      </div>

      <div className="flex flex-col gap-8 md:flex-row md:gap-8">
        <div className="flex flex-col md:w-1/2 bg-opacity-10 p-4 rounded-lg shadow-lg backdrop-blur-md">
          <div className="w-full h-72 bg-gray-400 rounded-lg shadow-lg"></div>
          <div className="flex flex-row gap-4 mt-4">
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="w-12 h-12 bg-gray-400 rounded-lg shadow-md"></div>
              ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-4xl font-extrabold">{service.serviceName} Consultation</h1>
          <p className="text-xl text-gray-300">Certified by Professionals • 4.9/5 ⭐ (120 reviews)</p>
          <p className="text-2xl font-bold text-yellow-400">
            ₹{service.pricing} <span className="line-through text-gray-500">₹11,599</span>
          </p>
          <p className="text-lg text-gray-200">{service.description}</p>
          <div className="flex flex-row gap-6">
            <button
              className="bg-gradient-to-r from-blue-700 to-blue-800 hover:bg-opacity-80 py-3 px-8 rounded-lg text-white shadow-lg transition duration-300"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
            <button
              className="bg-gradient-to-r from-green-600 to-green-700 hover:bg-opacity-80 py-3 px-8 rounded-lg text-white shadow-lg transition duration-300"
              onClick={() => handleBookNow(service)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <FAQsSection>
        <h2 className="text-2xl font-extrabold text-white mt-8">Frequently Asked Questions</h2>
        <div className="mt-4">
          {[ 
            { question: "How do I get started?", answer: "Simply click on 'Book Now' to schedule a consultation." },
            { question: "What should I prepare for the session?", answer: "Have your questions ready and make sure you're in a quiet space." },
            // Add more FAQ items here...
          ].map((faq, index) => (
            <div key={index}>
              <div
                className="faq-item"
                onClick={() => handleFAQClick(index)}
              >
                <h3 className="text-xl font-semibold">{faq.question}</h3>
              </div>
              <div className={`faq-answer ${openFAQ === index ? "show-answer" : ""}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </FAQsSection>
    </div>
  );
};

export default ProductPage;
