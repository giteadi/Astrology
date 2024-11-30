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
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    cursor: pointer;
    transition: background 0.3s;
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
  .faq-answer {
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    margin-top: 1rem;
    border-radius: 8px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .show-answer {
    opacity: 1;
  }
`;

const ProductPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // Get user from Redux store
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

  return (
    <div className="min-h-screen bg-gradient-to-t from-purple-800 to-indigo-900 text-white p-8">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-8">
        <button
          className="bg-opacity-20 hover:bg-opacity-40 text-white py-2 px-6 rounded-lg transition duration-300"
          onClick={() => navigate("/")}
        >
          Home
        </button>
        <button
          className="bg-opacity-20 hover:bg-opacity-40 text-white py-2 px-6 rounded-lg transition duration-300"
          onClick={() => navigate("/faqs")}
        >
          FAQs
        </button>
      </div>

      {/* Main Product Section */}
      <div className="flex flex-col gap-8 md:flex-row md:gap-8">
        {/* Image Section */}
        <div className="flex flex-col md:flex-row md:w-1/2 bg-opacity-10 p-4 rounded-lg">
          {/* Main Image */}
          <div className="flex flex-col gap-6 justify-start w-full md:w-2/3">
            <div className="w-full h-72 bg-gray-400 rounded-lg"></div>
          </div>

          {/* Small Images */}
          <div className="flex flex-row gap-4 justify-center items-center md:w-1/3 md:flex-col md:flex-col-reverse md:gap-2 mt-4 sm:mt-8">
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="w-12 h-12 bg-gray-400 rounded-lg" />
              ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-3xl">{product.title} Consultation</h1>
          <p className="text-xl">Certified by Professionals • 4.9/5 ⭐ (120 reviews)</p>
          <p className="text-2xl font-bold">
            ₹{product.price} <span className="line-through text-gray-400">₹1,599</span>
          </p>
          <p className="text-lg">{product.description}</p>
          <div className="flex gap-4">
            <button
              className="bg-opacity-20 hover:bg-opacity-40 py-2 px-6 rounded-lg text-white transition duration-300"
              onClick={() => handleBookNow(product)} // Call handleBookNow on button click
            >
              {isLoggedIn ? "BOOK NOW" : "LOGIN TO BOOK"}
            </button>
            <button className="bg-opacity-20 hover:bg-opacity-40 py-2 px-6 rounded-lg text-white transition duration-300">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <FAQsSection>
        <h2 className="text-2xl mb-4">FAQs</h2>
        <div className="faq-item" onClick={() => handleFAQClick(1)}>
          What is included in the {product.title} Consultation?
        </div>
        {openFAQ === 1 && (
          <div className="faq-answer show-answer">
            The {product.title} Consultation package includes personalized guidance, space analysis, and a complete energy alignment consultation with certified professionals. It’s tailored to optimize your environment for peace and prosperity.
          </div>
        )}

        <div className="faq-item" onClick={() => handleFAQClick(2)}>
          How can I book a consultation with an expert?
        </div>
        {openFAQ === 2 && (
          <div className="faq-answer show-answer">
            Booking a consultation is easy! Simply visit our website, select your preferred expert, and choose a time slot. You’ll receive a confirmation email with all the details.
          </div>
        )}

        <div className="faq-item" onClick={() => handleFAQClick(3)}>
          Are these consultations certified by professionals?
        </div>
        {openFAQ === 3 && (
          <div className="faq-answer show-answer">
            Yes! All consultations are conducted by certified professionals who are highly experienced in {product.title} and aligned with modern practices for your space’s harmony.
          </div>
        )}
      </FAQsSection>
    </div>
  );
};

export default ProductPage;
