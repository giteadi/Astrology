import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { removeFromCart, addToCart, setTotalAmount, clearCart } from '../Redux/CartSlice'; // Redux actions
import axios from 'axios';

const Cart = () => {
  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Assuming user is stored in auth slice
  console.log("user id cart", user);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/cart/${user.userId}`);
        const cartData = response.data;
        console.log("Fetched Cart Data:", cartData);

        if (cartData && cartData.length > 0) {
          cartData.forEach((item) => {
            const existingItem = cartItems.find(cartItem => cartItem.cart_item_id === item.cart_item_id); // Use cart_item_id
            if (!existingItem) {
              dispatch(addToCart(item));
            }
          });
        } else {
          dispatch(clearCart());
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    if (user && user.userId && cartItems.length === 0) { // Only fetch if no items are in the cart
      fetchCartItems();
    }
  }, [dispatch, user, cartItems.length]); // Avoid unnecessary re-fetches

  const calculateTotal = () => {
    const newTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    dispatch(setTotalAmount(newTotal));
  };

  const handleRemove = async (cart_item_id) => {
    if (!cart_item_id) {
      console.error("Invalid cart_item_id provided for deletion");
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:4000/api/cart/delete/${cart_item_id}`);
      if (response.status === 200) {
        console.log(`Item with cart_item_id: ${cart_item_id} removed successfully`);
        dispatch(removeFromCart(cart_item_id));
        calculateTotal();
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  useEffect(() => {
    calculateTotal();
  }, [cartItems]);

  const handleAddToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.cart_item_id === item.cart_item_id); // Use cart_item_id
    if (existingItem) {
      console.log("Item is already in the cart.");
      return;
    }
    dispatch(addToCart(item));
  };

  return (
    <div className="bg-gradient-to-r from-[#1c1c3d] to-[#4b0082] min-h-screen p-8 text-white">
      <div className="max-w-6xl mx-auto bg-opacity-10 bg-white p-6 rounded-xl shadow-lg backdrop-blur-lg focus-ring-white border border-white">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold my-6 text-center text-white opacity-80 transition-opacity duration-500">
          Your Cart
        </h2>
        {cartItems.length === 0 ? (
          <p className="text-center text-white text-lg opacity-70 transition-opacity duration-500">
            Your cart is empty
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-start">
            {cartItems.map((item) => (
              <div
                key={item.cart_item_id || item.id} // Use cart_item_id for unique key
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
    </div>
  );
};

export default Cart;
