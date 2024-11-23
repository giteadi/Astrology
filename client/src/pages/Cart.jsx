import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { removeFromCart, addToCart, setTotalAmount, clearCart } from '../Redux/CartSlice'; // Redux actions
import axios from 'axios';

const Cart = () => {
  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Assuming user is stored in auth slice

  // Fetch cart items when the component mounts
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/cart/${user.userId}`);
        const cartData = response.data;

        if (cartData && cartData.length > 0) {
          cartData.forEach(item => {
            dispatch(addToCart(item));  // Add to Redux store
          });
        } else {
          dispatch(clearCart()); // If no data, clear the cart
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchCartItems();
  }, [dispatch, user]);

  // Handle remove item from cart
  const handleRemove = async (cart_item_id) => {
    if (!cart_item_id) {
      console.error("Invalid cart_item_id provided for deletion");
      return;
    }

    try {
      // Make API call to remove item from the cart
      const response = await axios.delete(`http://localhost:4000/api/cart/delete/${cart_item_id}`);
      if (response.status === 200) {
        console.log(`Item with cart_item_id: ${cart_item_id} removed successfully`);

        // Dispatch Redux action to remove item from state
        dispatch(removeFromCart(cart_item_id));

        // Update total amount in Redux after removal
        const updatedTotal = cartItems
          .filter((item) => item.cart_item_id !== cart_item_id)
          .reduce((acc, item) => acc + item.price * item.quantity, 0);
        dispatch(setTotalAmount(updatedTotal));
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#1c1c3d] to-[#4b0082] min-h-screen p-8 text-white">
      <div className="max-w-6xl mx-auto bg-opacity-25 bg-white p-6 rounded-xl shadow-lg backdrop-blur-lg">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold my-6 text-center text-gray-100">
          Your Cart
        </h2>
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-100 text-lg">Your cart is empty</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div
                key={item.cart_item_id || item.id}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-center bg-opacity-25 bg-white p-4 rounded-lg mb-4 backdrop-blur-sm"
              >
                <div className="flex items-center gap-4 col-span-1 sm:col-span-2 lg:col-span-1">
                  <img
                    src={item.image || 'https://via.placeholder.com/100'}
                    alt={item.title || 'Product Image'}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{item.title || 'Item Name'}</h3>
                    <p className="text-sm text-gray-700">{item.description || 'No description available'}</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 col-span-1 sm:col-span-2 lg:col-span-1">
                  <div>
                    <p className="text-lg font-semibold text-gray-900">₹{item.price}</p>
                    <p className="text-gray-700">Qty: {item.quantity}</p>
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
        <div className="mt-6 p-4 rounded-lg shadow-lg bg-gray-700">
          <h3 className="text-lg font-bold flex justify-between text-gray-300">
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
