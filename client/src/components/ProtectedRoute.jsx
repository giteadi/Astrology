import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginUser } from '../Redux/AuthSlice'; // Adjust the path to your AuthSlice
import { FaFacebook, FaInstagram, FaGoogle } from 'react-icons/fa';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      loginUser({ email, password }) // Dispatch login action
    ).then(() => {
      if (isAuthenticated) {
        const redirectTo = location.state?.from?.pathname || '/';
        navigate(redirectTo, { replace: true });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1c1c3d] to-[#4b0082] flex flex-col items-center justify-center text-white px-4">
      <div className="w-full max-w-md p-6 bg-opacity-20 backdrop-blur-md bg-white/10 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">LOGIN</h1>

        {/* Display error if any */}
        {error && <p className="text-red-500 text-center mb-4">{error.message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm">EMAIL*</label>
            <input
              type="email"
              className="p-3 bg-transparent border border-white rounded w-full"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm">PASSWORD*</label>
            <input
              type="password"
              className="p-3 bg-transparent border border-white rounded w-full"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-white text-[#1c1c3d] font-bold rounded hover:bg-gray-200 transition"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'LOGIN'}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm mb-4">Or login using</p>
          <div className="flex justify-center gap-4">
            <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition">
              <FaGoogle className="text-[#DB4437] text-xl" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition">
              <FaFacebook className="text-[#1877F2] text-xl" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition">
              <FaInstagram className="text-[#C13584] text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;