import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled-components for specific custom animations or styles
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
  const [openFAQ, setOpenFAQ] = useState(null);
  const navigate = useNavigate();

  const handleFAQClick = (index) => {
    if (openFAQ === index) {
      setOpenFAQ(null); // Close the same FAQ if it's clicked again
    } else {
      setOpenFAQ(index);
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
      <div className="flex flex-col gap-4 md:flex-row md:gap-8">
        {/* Image Section */}
        <div className="flex flex-col md:flex-row md:w-1/2 bg-opacity-10 p-4 rounded-lg">
          {/* Small Images - Moved to the left */}
          <div className="flex flex-col gap-2 justify-center items-center md:w-1/3">
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="w-12 h-12 bg-gray-400 rounded-lg" />
              ))}
          </div>

          {/* Main Image */}
          <div className="flex flex-col gap-4 justify-start w-full md:w-2/3">
            <div className="w-full h-72 bg-gray-400 rounded-lg"></div>
          </div>
        </div>

        {/* Details Section */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl">Vastu Consultation Platinum</h1>
          <p className="text-xl">Certified by Professionals • 4.9/5 ⭐ (120 reviews)</p>
          <p className="text-2xl font-bold">
            ₹1,000 <span className="line-through text-gray-400">₹1,599</span>
          </p>
          <p className="text-lg">
            Designed for all your Vastu needs, this package provides insights to align your space with positive energies.
          </p>
          <div className="flex gap-4">
            <button className="bg-opacity-20 hover:bg-opacity-40 py-2 px-6 rounded-lg text-white transition duration-300">
              Add to Cart
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
        <div
          className="faq-item"
          onClick={() => handleFAQClick(1)}
        >
          What is included in the Vastu Consultation Platinum?
        </div>
        {openFAQ === 1 && (
          <div className="faq-answer show-answer">
            The Vastu Consultation Platinum package includes personalized guidance,
            space analysis, and a complete energy alignment consultation with certified
            professionals. It’s tailored to optimize your environment for peace and prosperity.
          </div>
        )}

        <div
          className="faq-item"
          onClick={() => handleFAQClick(2)}
        >
          How can I book a consultation with an expert?
        </div>
        {openFAQ === 2 && (
          <div className="faq-answer show-answer">
            Booking a consultation is easy! Simply visit our website, select your preferred
            expert, and choose a time slot. You’ll receive a confirmation email with all the
            details.
          </div>
        )}

        <div
          className="faq-item"
          onClick={() => handleFAQClick(3)}
        >
          Are these consultations certified by professionals?
        </div>
        {openFAQ === 3 && (
          <div className="faq-answer show-answer">
            Yes! All consultations are conducted by certified professionals who are highly
            experienced in Vastu Shastra and aligned with modern practices for your space’s harmony.
          </div>
        )}
      </FAQsSection>
    </div>
  );
};

export default ProductPage;
