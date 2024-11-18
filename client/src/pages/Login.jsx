import React from "react";
import { FaFacebook, FaInstagram, FaGoogle } from "react-icons/fa"; // React Icons

const LoginForm = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1c1c3d] to-[#4b0082] flex flex-col items-center justify-center text-white font-sans px-4">
      {/* Transparent Login Form */}
      <div className="w-full max-w-lg sm:max-w-md p-6 bg-opacity-20 backdrop-blur-md bg-white/10 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">LOGIN</h1>
        <form className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm">EMAIL*</label>
            <input
              type="email"
              className="p-3 bg-transparent border border-white rounded w-full"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm">PASSWORD*</label>
            <input
              type="password"
              className="p-3 bg-transparent border border-white rounded w-full"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex justify-between items-center text-sm mt-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 accent-white" />
              Remember me
            </label>
            <a
              href="#"
              className="text-blue-400 underline hover:text-blue-500 transition"
            >
              Forgot password?
            </a>
          </div>
          <button className="w-full py-3 bg-white text-[#1c1c3d] font-bold rounded hover:bg-gray-200 transition">
            LOGIN
          </button>
        </form>

        {/* Social Login Options */}
        <div className="text-center mt-6">
          <p className="text-sm mb-4">Or login using</p>
          <div className="flex justify-center gap-4">
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
      </div>
    </div>
  );
};

export default LoginForm;
