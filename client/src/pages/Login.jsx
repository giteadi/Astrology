import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../Redux/AuthSlice'; // Adjust the path to your AuthSlice
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook for redirection
import { Link } from 'react-router-dom'; // Import Link for internal navigation

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Used for navigation after successful login

  const { loading, error, isAuthenticated } = useSelector((state) => state.auth); // Added isAuthenticated

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isEmailValid = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Redirect user if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); 
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEmailValid(email)) {
      alert('Please enter a valid email.');
      return;
    }
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
            <Link
              to="/forgot-password" // Use Link for internal navigation
              className="text-blue-400 underline hover:text-blue-500 transition"
            >
              Forgot password?
            </Link>
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

        {/* Link to Register Page using Link component */}
        <div className="text-center mt-4">
          <p className="text-sm">
            Don't have an account?{' '}
            <Link
              to="/register" // Use Link for internal navigation
              className="text-blue-400 underline hover:text-blue-500 transition"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
