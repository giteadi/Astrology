import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateCartItem } from "../Redux/CartSlice"; // Redux action
import axios from "axios"; // API requests
import { useNavigate, useParams } from "react-router-dom"; // For navigation

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
  console.log("userId" , user)
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const { id } = useParams();  // The id passed in the URL

  const [service, setService] = useState(null);
  const [openFAQ, setOpenFAQ] = useState(null);

  const isLoggedIn = user !== null;

  // Fetch service data by id
  useEffect(() => {
    const fetchServiceById = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/cart/getServiceByID/${id}`);
        console.log("serviceData", response.data)
        setService(response.data); // Set the fetched service data
      } catch (error) {
        console.error("Failed to fetch service:", error);
        alert("Failed to fetch service data.");
      }
    };

    fetchServiceById();
  }, [id]);

  if (!service) {
    return <div>Loading...</div>; // Show loading state while fetching service data
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
        alert(error.response.data.message || "Failed to add item to the cart");
      } else {
        alert("Network error, please try again later.");
      }
    }
  };

  const handleBookNow = async (service) => {
    if (!user) {
      navigate("/login");
      return;
    }
  
    const userId = user.userId;
    if (!userId) {
      alert("User ID is missing. Please log in first.");
      return;
    }
  
    if (!service.id) {
      alert("Item ID is missing. Please check the product data.");
      return;
    }
  
    const cartItem = {
      user_id: userId,                // User ID from the Redux state
      item_id: service.id,             // Service ID from the fetched service
      title: service.title,            // Title from the fetched service
      description: service.description, // Description from the fetched service
      price: service.price,            // Price from the fetched service
      quantity: 1,                     // Default quantity to 1
    };
  
    try {
      const response = await axios.post("http://localhost:4000/api/cart/add", cartItem);
      if (response.status === 201) {
        dispatch(addToCart(cartItem));  // Dispatch to Redux store
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
          <h1 className="text-4xl font-extrabold">{service.title}</h1>
          <p className="text-xl text-gray-300">Certified by Professionals • 4.9/5 ⭐ (120 reviews)</p>
          <p className="text-2xl font-bold text-yellow-400 flex gap-5">
            <span className="">Price</span>₹{service.price} 
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
            { question: "How do I book a consultation?", answer: "You can book a consultation by clicking 'Add to Cart' or 'Buy Now'." },
            { question: "What does this consultation cover?", answer: "The consultation covers a thorough discussion about your dental health and treatments." },
            { question: "Can I reschedule my consultation?", answer: "Yes, rescheduling options are available." }
          ].map((faq, index) => (
            <div key={index} className="faq-item" onClick={() => handleFAQClick(index)}>
              <div className="text-lg font-bold">{faq.question}</div>
              <div className={`faq-answer ${openFAQ === index ? "show-answer" : ""}`}>
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </FAQsSection>
    </div>
  );
};

export default ProductPage;
