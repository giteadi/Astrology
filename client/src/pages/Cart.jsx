import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const CartContainer = styled.div`
  background: linear-gradient(to bottom, #12002f, #29004e, #3e32c6);
  min-height: 100vh;
  padding: 2rem;
  color: white;
  text-align: center;
  position: relative; /* Make it the container for absolute positioning of stars */
  overflow: hidden; /* Prevent scrolling from showing stars out of bounds */

  /* Create animated stars */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    z-index: -1; /* Ensure stars are behind the content */
    pointer-events: none;
    animation: stars 30s linear infinite; /* Animation for background stars */
  }

  /* Keyframe animation for the starry sky */
  @keyframes stars {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 100% 100%;
    }
  }

  /* Create multiple animated stars */
  .star {
    position: absolute;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background-color: white;
    animation: twinkle 3s infinite alternate;
  }

  /* Randomize positions and opacity of stars */
  @keyframes twinkle {
    0% {
      opacity: 0.2;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.2;
    }
  }

  /* Generate random stars using nth-child */
  .star:nth-child(1) {
    top: 20%; left: 15%; animation-duration: 4s;
  }
  .star:nth-child(2) {
    top: 40%; left: 30%; animation-duration: 5s;
  }
  .star:nth-child(3) {
    top: 60%; left: 45%; animation-duration: 6s;
  }
  .star:nth-child(4) {
    top: 70%; left: 60%; animation-duration: 7s;
  }
  .star:nth-child(5) {
    top: 30%; left: 80%; animation-duration: 8s;
  }
`;

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);  // Local state for cart items
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);  // Loading state for async operations
  const user = useSelector((state) => state.auth.user); // Assuming user is stored in auth slice

  console.log("user id cart", user);

  // Fetch cart items from the server when user is logged in
  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);  // Set loading to true when the fetch starts
      try {
        const response = await axios.get(`http://localhost:4000/api/cart/${user.userId}`);
        const cartData = response.data;
        console.log("Fetched Cart Data:", cartData);

        if (cartData && cartData.length > 0) {
          setCartItems(cartData);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);  // Set loading to false after the fetch operation
      }
    };

    if (user && user.userId) {
      fetchCartItems();
    }
  }, [user]);  // Only fetch when the user is logged in

  // Calculate total whenever cartItems change
  useEffect(() => {
    const calculateTotal = () => {
      if (cartItems.length === 0) {
        setTotalAmount(0);  // Set to 0 if no items
      } else {
        const newTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalAmount(newTotal);
      }
    };
    calculateTotal();
  }, [cartItems]);  // Recalculate total when cartItems changes

  const handleRemove = async (cart_item_id) => {
    if (!cart_item_id) {
      console.error("Invalid cart_item_id provided for deletion");
      return;
    }

    try {
      // API call to delete item from cart
      const response = await axios.delete(`http://localhost:4000/api/cart/delete/${cart_item_id}`);
      if (response.status === 200) {
        console.log(`Item with cart_item_id: ${cart_item_id} removed successfully`);
        
        // After removing, refetch the updated cart data from the server
        const updatedCart = await axios.get(`http://localhost:4000/api/cart/${user.userId}`);
        setCartItems(updatedCart.data); // Update local state with fresh data from the server
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleAddToCart = async (item) => {
    try {
      // Send add request to the server (only interact with DB)
      const response = await axios.post(`http://localhost:4000/api/cart/add`, { userId: user.userId, item });
      if (response.status === 200) {
        console.log('Item added to cart on the server!');
        // Fetch updated cart data after adding the item
        const updatedCart = await axios.get(`http://localhost:4000/api/cart/${user.userId}`);
        setCartItems(updatedCart.data); // Update the local state with updated cart
      }
    } catch (error) {
      console.error("Error adding item to the cart:", error);
    }
  };

  return (
    <CartContainer>
      <div className="max-w-6xl mx-auto bg-opacity-10 bg-white p-6 rounded-xl shadow-lg backdrop-blur-lg focus-ring-white border border-white">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold my-6 text-center text-white opacity-80 transition-opacity duration-500">
          Your Cart
        </h2>
        {loading ? (
          <div className="text-center text-white text-lg opacity-70 transition-opacity duration-500">
            Loading...
          </div>
        ) : cartItems.length === 0 ? (
          <p className="text-center text-white text-lg opacity-70 transition-opacity duration-500">
            Your cart is empty
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-start">
            {cartItems.map((item) => (
              <div
                key={item.cart_item_id || item.id}  // Use cart_item_id for unique key
                className="bg-gradient-to-r from-[#1c1c3d] to-[#4b0082] p-4 rounded-lg mb-4 backdrop-blur-sm flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity duration-500 border border-white"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image || 'https://via.placeholder.com/100'}
                    alt={item.title || 'Product Image'}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">{item.title || 'Item Name'}</h3>
                    <p className="text-sm text-gray-300">{item.description || 'No description available'}</p>
                  </div>
                </div>
                <div className="flex justify-around items-center gap-4 mt-4 w-full">
                  <div className="flex flex-col items-center">
                    <p className="text-lg font-semibold text-gray-300">₹{item.price}</p>
                    <p className="text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <button
                    onClick={() => handleRemove(item.cart_item_id)} // Use cart_item_id for deletion
                    className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg mt-2 sm:mt-0"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-6 p-4 rounded-lg shadow-lg bg-gray-700 opacity-80 hover:opacity-100 transition-opacity duration-500">
          <h3 className="text-lg font-bold flex justify-between text-white">
            Total: <span>₹{totalAmount}</span>
          </h3>
          <button
            className="mt-4 py-2 px-6 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold text-lg w-full sm:w-auto"
            disabled={cartItems.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      {/* Generate stars dynamically */}
      {[...Array(500)].map((_, index) => (
        <div
          key={index}
          className="star"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 2 + 3}s`, // Random durations
            animationDelay: `${Math.random() * 2}s` // Random delays
          }}
        />
      ))}
    </CartContainer>
  );
};

export default Cart;
