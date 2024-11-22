import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../Redux/AuthSlice'; // Adjust the path to your AuthSlice
import { FaFacebook, FaInstagram, FaGoogle } from 'react-icons/fa';
import { useState } from 'react';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isEmailValid = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEmailValid(email)) {
      alert('Please enter a valid email.');
      return;
    }
    // if (password.length < 6) {
    //   alert('Password must be at least 6 characters long.');
    //   return;
    // }
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1c1c3d] to-[#4b0082] flex flex-col items-center justify-center text-white font-sans px-4">
      <div className="w-full max-w-lg sm:max-w-md p-6 bg-opacity-20 backdrop-blur-md bg-white/10 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">LOGIN</h1>

        {error && (
          <p className="text-red-500 text-center mb-4">
            {error.message || 'An unexpected error occurred. Please try again.'}
          </p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
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
          <div className="flex justify-between items-center text-sm mt-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 accent-white" />
              Remember me
            </label>
            <a
              href="/forgot-password"
              className="text-blue-400 underline hover:text-blue-500 transition"
            >
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className={`w-full py-3 font-bold rounded ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-white text-[#1c1c3d] hover:bg-gray-200'
            } transition`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'LOGIN'}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm mb-4">Or login using</p>
          <div className="flex justify-center gap-4">
            <button
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition"
              onClick={() => console.log('Google Login')}
            >
              <FaGoogle className="text-[#DB4437] text-xl sm:text-2xl" />
            </button>
            <button
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition"
              onClick={() => console.log('Facebook Login')}
            >
              <FaFacebook className="text-[#1877F2] text-xl sm:text-2xl" />
            </button>
            <button
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition"
              onClick={() => console.log('Instagram Login')}
            >
              <FaInstagram className="text-[#C13584] text-xl sm:text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
