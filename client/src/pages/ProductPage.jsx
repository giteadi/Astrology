import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/CartSlice"; // Redux action
import axios from "axios"; // API requests
import { useNavigate, useParams } from "react-router-dom"; // For navigation

// Styled-components for custom styling
const FAQsSection = styled.section`
  margin-top: 4rem;
  .faq-item {
    background: rgba(255, 255, 255, 0.1); /* Glassmorphism background */
    padding: 1rem;
    border-radius: 15px;
    margin-bottom: 1.5rem;
    backdrop-filter: blur(8px); /* Apply blur for glass effect */
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1); /* Soft shadow */
    cursor: pointer;
    transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-5px); /* Slight lift on hover */
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2); /* Stronger shadow */
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
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); /* Subtle shadow for pop effect */
`;

const ProductPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // Get user from Redux store
  const { cartItems } = useSelector((state) => state.cart); // Get cart items from Redux
  const navigate = useNavigate(); // For navigation
  const { title } = useParams(); // Retrieve dynamic 'title' param from URL
  const [openFAQ, setOpenFAQ] = useState(null); // For controlling FAQ visibility
  const [isLoggedIn, setIsLoggedIn] = useState(user !== null); // Check if user is logged in

  // Sample services data
  const services = [
    { id: 102, title: "Astrology", description: "Insights into your life's path.", price: 299.99 },
    { id: 103, title: "Vastu", description: "Celestial alignments insights.", price: 399.99 },
    { id: 104, title: "Numerology", description: "Guidance through life's challenges.", price: 499.99 },
    { id: 201, title: "Palmistry", description: "Read your palm lines.", price: 299.99 },
    { id: 202, title: "Tarot", description: "Guidance through tarot cards.", price: 399.99 },
    { id: 203, title: "Crystal Healing", description: "Energy through crystals.", price: 499.99 },
    { id: 1, title: "Fitness", description: "Stay fit with personalized plans.", price: 199.99 },
    { id: 2, title: "Meditation", description: "Achieve peace with guided sessions.", price: 149.99 },
    { id: 3, title: "Yoga", description: "Boost flexibility and strength.", price: 249.99 },
  ];

  // Find the product that matches the title from the URL
  const product = services.find((service) => service.title.toLowerCase() === title.toLowerCase());

  // If the product is not found, handle the error
  if (!product) {
    return <div>Product not found</div>;
  }

  const handleFAQClick = (index) => {
    if (openFAQ === index) {
      setOpenFAQ(null); // Close the same FAQ if clicked again
    } else {
      setOpenFAQ(index);
    }
  };

  // Function to handle 'Book Now' button click
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

    console.log("Cart Item:", cartItem); // Debugging the cartItem object

    try {
      const response = await axios.post("http://localhost:4000/api/cart/add", cartItem);

      if (response.status === 200) {
        console.log("Item added to the cart successfully!");
        dispatch(addToCart(cartItem)); // Update Redux store
        navigate(`/product/${item.title}`); // Navigate to dynamic product page
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("Failed to add item. Please try again.");
    }
  };

  // Calculate the total cart item count
  const totalCartItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-t from-purple-800 to-indigo-900 text-white p-8">
      {/* Navbar */}
      <div className="flex justify-end items-center mb-8">
        <button
          className="bg-opacity-20 hover:bg-opacity-40 text-white py-2 px-6 rounded-lg transition duration-300"
          onClick={() => navigate("/")}
        >
          Home
        </button>
        <div className="relative">
          <button
            className="bg-opacity-20 hover:bg-opacity-40 text-white py-2 px-6 rounded-lg transition duration-300"
            onClick={() => navigate("/cart")}
          >
            Cart
            {/* Display the cart item count notification */}
            {totalCartItems > 0 && (
              <CartNotification>{totalCartItems}</CartNotification>
            )}
          </button>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="flex flex-col gap-8 md:flex-row md:gap-8">
        {/* Image Section */}
        <div className="flex flex-col md:flex-row md:w-1/2 bg-opacity-10 p-4 rounded-lg shadow-lg backdrop-blur-md">
          {/* Main Image */}
          <div className="flex flex-col gap-6 justify-start w-full md:w-2/3">
            <div className="w-full h-72 bg-gray-400 rounded-lg shadow-lg" />
          </div>

          {/* Small Images */}
          <div className="flex flex-row gap-4 justify-center items-center md:w-1/3 md:flex-col md:flex-col-reverse md:gap-2 mt-4 sm:mt-8">
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="w-12 h-12 bg-gray-400 rounded-lg shadow-md" />
              ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-4xl font-extrabold text-white">{product.title} Consultation</h1>
          <p className="text-xl text-gray-300">Certified by Professionals • 4.9/5 ⭐ (120 reviews)</p>
          <p className="text-2xl font-bold text-yellow-400">
            ₹{product.price} <span className="line-through text-gray-500">₹1,599</span>
          </p>
          <p className="text-lg text-gray-200">{product.description}</p>
          <div className="flex gap-4">
            <button
              className="bg-gradient-to-r from-blue-700 to-blue-800 hover:bg-opacity-80 py-3 px-8 rounded-lg text-white shadow-lg transition duration-300"
              onClick={() => handleBookNow(product)} // Call handleBookNow on button click
            >
              {isLoggedIn ? "BOOK NOW" : "LOGIN TO BOOK"}
            </button>
            <button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:bg-opacity-80 py-3 px-8 rounded-lg text-white shadow-lg transition duration-300">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <FAQsSection>
        <h2 className="text-2xl font-extrabold text-white mt-8">Frequently Asked Questions</h2>
        <div className="mt-4">
          {[{ question: "How do I book a consultation?", answer: "You can book directly through this page." },
            { question: "How do I pay?", answer: "We accept online payments via credit card, debit card, and UPI." },
            { question: "What is the duration of the consultation?", answer: "Each consultation lasts 60 minutes." }]
            .map((faq, index) => (
              <div key={index} className="faq-item">
                <div onClick={() => handleFAQClick(index)}>
                  <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                </div>
                <div className={`faq-answer ${openFAQ === index ? "show-answer" : ""}`}>
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              </div>
            ))}
        </div>
      </FAQsSection>
    </div>
  );
};

export default ProductPage;
