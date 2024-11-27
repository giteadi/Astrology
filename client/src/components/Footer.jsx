import React from "react";

const Footer = () => {
  return (
    <div className="relative bg-gradient-to-r from-[#3E32C6]/80 to-[#3E32C6]/80 text-white py-12 text-center backdrop-blur-xl border-t border-white/30">
      {/* Noise effect applied using the ::after pseudo-element */}
      <div className="absolute inset-0 bg-noise opacity-20 z-0"></div>

      <div className="relative z-10">
        <p className="text-2xl font-semibold text-gray-100 mb-4">
          &copy; 2024 <span className="font-extrabold">Your Company</span>. All rights reserved.
        </p>
        <p className="text-sm text-gray-300">
          <a
            href="/privacy-policy"
            className="font-medium hover:text-[#8A6CFC] transition-colors duration-300"
          >
            Privacy Policy
          </a>{" "}
          |{" "}
          <a
            href="/terms-of-service"
            className="font-medium hover:text-[#8A6CFC] transition-colors duration-300"
          >
            Terms of Service
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
