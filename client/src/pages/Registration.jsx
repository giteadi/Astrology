import React, { useState } from "react";
import { FaFacebook, FaInstagram, FaGoogle } from "react-icons/fa"; // React Icons

const RegistrationForm = () => {
  const [otpTimer, setOtpTimer] = useState(16); // OTP Timer

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1c1c3d] to-[#4b0082] flex flex-col items-center justify-center text-white font-sans px-4">
      {/* Transparent Form */}
      <div className="w-full max-w-2xl sm:max-w-xl p-6 bg-opacity-20 backdrop-blur-md bg-white/10 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">GET REGISTERED</h1>
        <form className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm">NAME*</label>
            <input
              type="text"
              className="p-3 bg-transparent border border-white rounded w-full"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col flex-1">
              <label className="text-sm">AGE*</label>
              <input
                type="number"
                className="p-3 bg-transparent border border-white rounded w-full"
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="text-sm">BIRTHDATE*</label>
              <input
                type="date"
                className="p-3 bg-transparent border border-white rounded w-full"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-sm">EMAIL*</label>
            <input
              type="email"
              className="p-3 bg-transparent border border-white rounded w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm">PHONE NUMBER*</label>
            <input
              type="tel"
              className="p-3 bg-transparent border border-white rounded w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm">PASSWORD*</label>
            <input
              type="password"
              className="p-3 bg-transparent border border-white rounded w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm">RE-ENTER PASSWORD*</label>
            <input
              type="password"
              className="p-3 bg-transparent border border-white rounded w-full"
            />
          </div>
          <button className="w-full py-3 bg-white text-[#1c1c3d] font-bold rounded hover:bg-gray-200 transition">
            REGISTER NOW
          </button>
        </form>

        {/* Social Login with React Icons */}
        <div className="flex justify-center gap-4 mt-6">
          <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition">
            <FaGoogle className="text-[#DB4437] text-xl sm:text-2xl" />
          </button>
          <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition">
            <FaFacebook className="text-[#1877F2] text-xl sm:text-2xl" />
          </button>
          <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition">
            <FaInstagram className="text-[#C13584] text-xl sm:text-2xl" />
          </button>
        </div>
      </div>

      {/* OTP Section */}
      <div className="mt-12 text-center">
        <h2 className="text-xl font-bold">ENTER OTP</h2>
        <p className="text-sm">
          Change Number <span className="text-green-500">+918815268825</span> |{" "}
          <span className="text-blue-400 underline cursor-pointer">Change</span>
        </p>
        <div className="flex justify-center gap-2 mt-4">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <input
                key={i}
                type="text"
                maxLength="1"
                className="w-10 h-10 sm:w-12 sm:h-12 text-center text-lg font-bold bg-transparent border border-white rounded"
              />
            ))}
        </div>
        <p className="mt-2 text-sm">0:{otpTimer < 10 ? `0${otpTimer}` : otpTimer}</p>
      </div>
    </div>
  );
};

export default RegistrationForm;
