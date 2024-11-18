import React from "react";

const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-[#1c1c3d] to-[#4b0082] text-white py-8 text-center backdrop-blur-sm border-t border-white/30">
      <p className="text-lg text-gray-300 mb-2">&copy; 2024 Your Company. All rights reserved.</p>
      <p className="text-sm text-gray-400">
        <a href="/privacy-policy" className="font-semibold hover:text-[#4b0082]">Privacy Policy</a> | 
        <a href="/terms-of-service" className="font-semibold hover:text-[#4b0082]"> Terms of Service</a>
      </p>
    </div>
  );
};

export default Footer;
