import React from "react";
import TriangularCarousel from "../components/TriangularCarousal";

const Astrology = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1c1c3d] to-[#4b0082] text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Astrology Products</h1>
        {/* Adjust carousel wrapper */}
        <div className="flex flex-wrap justify-center gap-6">
          <TriangularCarousel />
        </div>
      </div>
    </div>
  );
};

export default Astrology;
